import axios from 'axios';

export const getMyOrders = async () => {
  const token = localStorage.getItem('token');

  const response = await axios.get('http://localhost:8080/api/orders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
