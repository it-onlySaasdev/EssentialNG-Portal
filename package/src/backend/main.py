from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import users
import database
from pydantic import BaseModel
from datetime import datetime, timedelta  # ✅ ADD THIS IMPORT

app = FastAPI()

# ENHANCED CORS MIDDLEWARE
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.8.254:3000",  # Your current IP
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  CRITICAL FIX: Add this OPTIONS handler
@app.options("/{rest_of_path:path}")
async def preflight_handler(rest_of_path: str):
    """Handle OPTIONS preflight requests for all routes"""
    return JSONResponse(
        content={"message": "OK"},
        headers={
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": "true",
        },
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
        "is_admin": db_user.is_admin,
    }

@app.get("/users")
def list_users(skip: int = 0, limit: int = 10, db: Session = Depends(users.get_db)):
    users_list = users.get_users(db, skip=skip, limit=limit)
    return [
        {
            "user_id": u.id, 
            "username": u.username, 
            "email": u.email,
            "is_admin": u.is_admin
        }
        for u in users_list
    ]

# ✅ ADDED: Admin stats endpoint
@app.get("/admin/stats")
def get_admin_stats(db: Session = Depends(users.get_db)):
    """Get admin dashboard statistics"""
    total_users = db.query(users.User).count()
    
    # Get today's new users
    today = datetime.utcnow().date()
    tomorrow = today + timedelta(days=1)
    new_users_today = db.query(users.User).filter(
        users.User.created_at >= today,
        users.User.created_at < tomorrow
    ).count()
    
    # Placeholder values - replace with real data when you add these tables
    total_jobs = 0
    total_hotels = 0
    total_venues = 0
    total_revenue = 8500000
    active_sessions = 1234
    
    return {
        "totalUsers": total_users,
        "newUsersToday": new_users_today,
        "activeSessions": active_sessions,
        "totalRevenue": total_revenue,
        "jobsPosted": total_jobs,
        "hotelBookings": total_hotels
    }

@app.get("/admin/users")
def get_all_users(db: Session = Depends(users.get_db)):
    all_users = users.get_all_users(db)
    return [
        {
            "user_id": u.id,
            "username": u.username,
            "email": u.email,
            "is_admin": u.is_admin,
            "created_at": u.created_at
        }
        for u in all_users
    ]

@app.post("/admin/make-admin/{user_id}")
def promote_to_admin(user_id: int, db: Session = Depends(users.get_db)):
    user = users.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = True
    db.commit()
    db.refresh(user)
    
    return {
        "message": f"User {user.username} is now an admin",
        "user_id": user.id,
        "is_admin": user.is_admin
    }

@app.get("/")
def read_root():
    return {"message": "EssentialNG-Portal API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}