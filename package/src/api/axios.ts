// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.10.5:8000",  // FastAPI backend URL
  withCredentials: true, // if you’re using cookies/session auth
});

export default api;
