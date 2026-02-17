from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import users
import database
from pydantic import BaseModel

app = FastAPI()

# FIXED CORS MIDDLEWARE - COMPLETE CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.8.253:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create DB tables
database.Base.metadata.create_all(bind=database.engine)

@app.post("/register")
def register_user(user: users.UserCreate, db: Session = Depends(users.get_db)):
    db_user = users.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = users.create_user(db=db, user=user)
    return {
        "message": "Registration successful",
        "user_id": new_user.id,
        "username": new_user.username,
        "email": new_user.email,
    }

# Add this Pydantic model for login request
class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(users.get_db)):
    db_user = users.get_user_by_email(db, email=request.email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not users.verify_password(request.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "username": db_user.username,
        "email": db_user.email,
    }

@app.get("/users")
def list_users(skip: int = 0, limit: int = 10, db: Session = Depends(users.get_db)):
    users_list = users.get_users(db, skip=skip, limit=limit)
    return [
        {"user_id": u.id, "username": u.username, "email": u.email}
        for u in users_list
    ]

@app.get("/")
def read_root():
    return {"message": "EssentialNG-Portal API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}