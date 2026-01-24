from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from .database import Base, SessionLocal
import bcrypt


# -----------------------------
# SQLAlchemy User model (DB Table)
# -----------------------------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)  # hashed password


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

    class Config:
        orm_mode = True


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
    db_user = User(username=user.username, email=user.email, password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(User).offset(skip).limit(limit).all()
