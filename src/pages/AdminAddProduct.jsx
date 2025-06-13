import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminAddProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
        await axios.post('http://localhost:8080/api/products', product, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Ürün başarıyla eklendi!');
      } catch (err) {
        toast.error('Ürün eklenemedi!');
        console.error(err);
      }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#0f172a] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-[#1e293b] p-10 rounded-3xl shadow-xl border border-[#d1e3e2] dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-6 text-center">
          Yeni Ürün Ekle
        </h2>

        <div className="space-y-4">
          {[
            { label: 'İsim', name: 'name', type: 'text', placeholder: 'Ürün adı' },
            { label: 'Açıklama', name: 'description', type: 'text', placeholder: 'Ürün açıklaması' },
            { label: 'Fiyat', name: 'price', type: 'number', placeholder: '₺' },
            { label: 'Stok', name: 'stock', type: 'number', placeholder: 'Stok miktarı' },
            { label: 'Görsel URL', name: 'imageUrl', type: 'text', placeholder: 'https://...' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <input
                name={name}
                type={type}
                onChange={handleChange}
                required={name !== 'imageUrl'}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none dark:bg-gray-800 dark:text-white"
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white py-3 rounded-full font-medium shadow-md transition duration-300"
        >
          Ürünü Ekle
        </button>
      </form>
    </div>
  );
}

export default AdminAddProduct;
