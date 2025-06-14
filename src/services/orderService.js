import axios from 'axios';

export const getMyOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('https://cleanaura-backend.onrender.com/api/orders', {
 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
