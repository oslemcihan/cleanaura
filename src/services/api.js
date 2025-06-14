import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getFavorites = () => API.get('/favorites');
export const addFavorite = (productId) => API.post(`/favorites/${productId}`);
export const removeFavorite = (productId) => API.delete(`/favorites/${productId}`);
export const getAllProducts = () => API.get('/products');

export default API;
