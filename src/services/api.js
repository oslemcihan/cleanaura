import axios from 'axios';

export const getFavorites = () => API.get('/favorites');
export const addFavorite = (productId) => API.post(`/favorites/${productId}`);
export const removeFavorite = (productId) =>
  API.delete(`/favorites/${productId}`);

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getAllProducts = () => API.get('/products');
export default API;
