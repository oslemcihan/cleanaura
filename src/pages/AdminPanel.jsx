import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const AdminPanel = () => {
  const [discount, setDiscount] = useState('');
  const [currentDiscount, setCurrentDiscount] = useState(null);

  const fetchDiscount = async () => {
    try {
      const response = await API.get('/admin/settings/discount');
      setCurrentDiscount(response.data);
    } catch (err) {
      console.error('İndirim oranı alınamadı', err);
    }
  };

  const handleDiscountUpdate = async () => {
    try {
      await API.put(`/admin/settings/discount?rate=${parseFloat(discount)}`);
      toast.success('İndirim oranı başarıyla güncellendi!');
      setDiscount('');
      fetchDiscount();
    } catch (err) {
      toast.error('Güncelleme başarısız: ' + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    fetchDiscount();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#0f172a] flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-[#1e293b] p-10 rounded-3xl shadow-xl border border-[#d1e3e2] dark:border-gray-700 w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-6 text-center">
          İndirim Ayarları
        </h2>

        <div className="mb-6 text-center text-[#1f2937] dark:text-gray-300">
          <p className="text-base">
            <strong>Geçerli İndirim Oranı:</strong>{' '}
            {currentDiscount !== null
              ? `${(currentDiscount * 100).toFixed(2)}%`
              : 'Yükleniyor...'}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Yeni İndirim Oranı (%):
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="örn: 10"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3ABEFF] shadow-sm"
            />
          </div>

          <button
            onClick={handleDiscountUpdate}
            className="w-full bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white py-3 rounded-full font-medium shadow-md transition duration-300"
          >
            Güncelle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
