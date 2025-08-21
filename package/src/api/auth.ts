// src/api/auth.ts
import api from "./axios";

export interface SignupData {
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Signup request
export async function signup(data: SignupData) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

// Login request
export async function login(data: LoginData) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

// Get current logged-in user
export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}
