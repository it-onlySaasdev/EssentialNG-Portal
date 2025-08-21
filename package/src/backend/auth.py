# src/backend/auth.py
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext

router = APIRouter()

# Fake DB (replace later with SQLAlchemy or real DB)
fake_users_db = {}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---- Pydantic Schemas ----
class SignupRequest(BaseModel):
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    email: EmailStr

# ---- Signup ----
@router.post("/signup", response_model=UserResponse)
def signup(data: SignupRequest):
    if data.email in fake_users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = pwd_context.hash(data.password)
    fake_users_db[data.email] = hashed_password
    return {"email": data.email}

# ---- Login ----
@router.post("/login", response_model=UserResponse)
def login(data: LoginRequest):
    user_password = fake_users_db.get(data.email)
    if not user_password or not pwd_context.verify(data.password, user_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"email": data.email}

# ---- Me (Current user) ----
@router.get("/me", response_model=UserResponse)
def get_current_user():
    # placeholder, later replace with JWT/session logic
    return {"email": "demo@business.com"}
