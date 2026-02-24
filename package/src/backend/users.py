from sqlalchemy import Column, Integer, String, Boolean, DateTime  # ✅ Added DateTime
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from database import Base, SessionLocal
import bcrypt
from datetime import datetime
from typing import Optional, List


# -----------------------------
# SQLAlchemy User model (DB Table)
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # hashed password
    is_admin = Column(Boolean, default=False)  # Admin flag
    created_at = Column(DateTime, default=datetime.utcnow)  # Timestamp


# -----------------------------
# Pydantic Schemas
# -----------------------------
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):  # For admin updates
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = None


# -----------------------------
# Password Utils
# -----------------------------
def hash_password(plain_password: str) -> str:
    """Hash plain text password using bcrypt"""
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(plain_password.encode("utf-8"), salt)
    return hashed.decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify that plain password matches hashed password"""
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))


# -----------------------------
# CRUD Functions
# -----------------------------
def get_db():
    """ Dependency function to provide DB session """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_user(db: Session, user: UserCreate):
    """ Insert new user into database with hashed password """
    hashed_pw = hash_password(user.password)
    db_user = User(
        username=user.username, 
        email=user.email, 
        password=hashed_pw,
        is_admin=False  # New users are not admins by default
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()


def get_all_users(db: Session):  # For admin panel
    return db.query(User).all()


def update_user(db: Session, user_id: int, user_update: UserUpdate):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        update_data = user_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_user, key, value)
        db.commit()
        db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int):
    db_user = get_user_by_id(db, user_id)
    if db_user:
        db.delete(db_user)
        db.commit()
        return True
    return False


def get_admin_users(db: Session):
    return db.query(User).filter(User.is_admin == True).all()


def make_admin(db: Session, email: str):
    user = get_user_by_email(db, email)
    if user:
        user.is_admin = True
        db.commit()
        db.refresh(user)
    return user