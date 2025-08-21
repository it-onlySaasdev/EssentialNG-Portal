# src/backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router  # import routes from auth.py

app = FastAPI()

# CORS setup (allow Next.js frontend to talk to FastAPI)
origins = [
    "http://localhost:3000",   # local Next.js dev
    "http://127.0.0.1:3000",   # alternative local dev
    # add your LAN IP if testing on phone, e.g. "http://172.20.10.5:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, etc.
    allow_headers=["*"],
)

# Register routes
app.include_router(auth_router, prefix="/auth", tags=["auth"])

@app.get("/")
def root():
    return {"message": "FastAPI backend running "}
