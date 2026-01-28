// src/api/auth.ts
import api from "./axios";

export const signup = (data: { 
  username: string;  // ← REQUIRED by backend (UserCreate model)
  email: string; 
  password: string 
}) => {
  // Changed from /auth/signup to /register to match FastAPI endpoint
  return api.post("/register", data);
};

export const login = (data: { 
  email: string; 
  password: string 
}) => {
  return api.post("/login", data);
};

// Optional: Add logout function
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};