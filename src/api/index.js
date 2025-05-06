import axios from 'axios';

const api = axios.create({
  baseURL: 'process.env.REACT_APP_API_URL', 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setAuthToken = (token) => {
  localStorage.setItem('token', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('token');
};

export default api;