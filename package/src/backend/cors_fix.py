# backend/cors_fix.py
from fastapi.middleware.cors import CORSMiddleware

def add_cors_middleware(app):
    """Add CORS middleware to existing FastAPI app"""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://172.20.10.5:3000",  # Your React frontend IP
            "http://localhost:3000",     # Localhost
            "http://127.0.0.1:3000",     # Localhost alternative
        ],
        allow_credentials=True,
        allow_methods=["*"],  # GET, POST, PUT, DELETE, etc.
        allow_headers=["*"],  # All headers
    )
    return app