// src/api/axios.ts
import axios from "axios";

// Important: This must point to your FastAPI backend
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' 
    ? '/api'  // In production, use relative path
    : 'http://localhost:8000',  // In development
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Timeout error - backend took too long to respond');
    } else if (error.response) {
      console.error(`Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No response received - is backend running?');
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;