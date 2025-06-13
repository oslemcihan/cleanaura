import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:8080/api/products',
        { name, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('Ürün başarıyla eklendi!');
      navigate('/');
    } catch (err) {
      toast.error('Ürün eklenemedi: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-gray-900 p-10 rounded-3xl shadow-xl border border-[#d1e3e2] dark:border-gray-700 max-w-md w-full">
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-6 text-center">
          Yeni Ürün Ekle
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Ürün Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ABEFF] shadow-sm"
          />
          <input
            type="number"
            placeholder="Fiyat"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ABEFF] shadow-sm"
          />
          <button
            type="submit"
            className="bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white py-3 rounded-full font-medium shadow-lg transition duration-300"
          >
            Ürünü Ekle
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
