import axios from 'axios';

const api = axios.create({
  baseURL: 'https://curatorplaylistbackend-4.onrender.com', 
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
  localStorage.setItem('jwtToken', token); 
};

export const clearAuthToken = () => {
  localStorage.removeItem('jwtToken');
};


export default api;