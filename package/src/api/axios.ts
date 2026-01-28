// src/api/axios.ts
import axios from "axios";

// Important: This must point to your FastAPI backend
const api = axios.create({
  baseURL: "http://172.20.10.5:8000",  // Your FastAPI backend IP
  // OR if running locally: "http://localhost:8000"
  // OR if using different port: "http://localhost:8000"
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;