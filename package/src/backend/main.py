from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import users, database
# ADD THIS IMPORT:
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ADD CORS MIDDLEWARE:
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://172.20.10.5:3000",  # Your React frontend IP
        "http://localhost:3000",     # Localhost
        "http://127.0.0.1:3000",     # Localhost alternative
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
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


@app.post("/login")
def login(email: str, password: str, db: Session = Depends(users.get_db)):
    db_user = users.get_user_by_email(db, email=email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not users.verify_password(password, db_user.password):
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