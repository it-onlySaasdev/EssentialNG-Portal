// src/api/axios.ts
import axios from "axios";

// Important: This must point to your FastAPI backend
const api = axios.create({
   baseURL: "http://localhost:8000",  // CHANGE THIS - use localhost NOT 192.168.8.254
  // OR if running locally: "http://localhost:8000"
  // OR if using different port: "http://localhost:8000"
  timeout: 10000,
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