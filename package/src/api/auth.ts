
// src/api/auth.ts
import api from "./axios";

export const signup = (data: { email: string; password: string }) => {
  return api.post("/auth/signup", data); //  matches FastAPI route
};
