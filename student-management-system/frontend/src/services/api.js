import axios from 'axios';

/**
 * Create a centralized Axios HTTP client instance.
 * Automatically points to backend API base URL.
 */
const API = axios.create({
  baseURL: 'http://localhost:5001/api'
});

/**
 * Axios Request Interceptor.
 * Before every HTTP request is sent, check if a JWT token exists in localStorage.
 * If found, append it to the Authorization header as a Bearer token.
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
