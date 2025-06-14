import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [shippingUpdates, setShippingUpdates] = useState({});
  const [filterStatus, setFilterStatus] = useState('ALL');

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await API.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Tüm siparişler alınamadı:', error);
    }
  };

  const translateToBackendStatus = (status) => {
    switch (status) {
      case 'PENDING': return 'HAZIRLANIYOR';
      case 'SHIPPED': return 'KARGODA';
      case 'DELIVERED': return 'TESLIM_EDILDI';
      default: return status;
    }
  };

  const getShippingStatusLabel = (status) => {
    switch (status) {
      case 'PENDING': return 'Hazırlanıyor';
      case 'SHIPPED': return 'Kargoda';
      case 'DELIVERED': return 'Teslim Edildi';
      default: return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-600';
      case 'SHIPPED': return 'text-blue-600';
      case 'DELIVERED': return 'text-green-600';
      default: return 'text-gray-800 dark:text-gray-300';
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setShippingUpdates((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const updateShippingStatus = async (orderId) => {
    const newStatus = shippingUpdates[orderId];
    if (!newStatus) return;

    const translatedStatus = translateToBackendStatus(newStatus);

    try {
      await API.put(`/admin/orders/${orderId}/shipping-status?status=${translatedStatus}`);
      toast.success('Kargo durumu başarıyla güncellendi!');
      fetchAllOrders();
    } catch (error) {
      console.error('Güncelleme başarısız:', error);
      toast.error('Kargo durumu güncellenirken bir hata oluştu.');
    }
  };

  const filteredOrders =
    filterStatus === 'ALL'
      ? orders
      : orders.filter((order) => order.shippingStatus === filterStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#0f172a] px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Sipariş Yönetimi</h2>

      <div className="mb-6 max-w-md mx-auto">
        <label className="block mb-1 font-medium text-gray-800 dark:text-gray-300">Kargo Durumuna Göre Filtrele</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#3ABEFF] bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
        >
          <option value="ALL">Tüm Siparişler</option>
          <option value="PENDING">Hazırlanıyor</option>
          <option value="SHIPPED">Kargoda</option>
          <option value="DELIVERED">Teslim Edildi</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Hiç sipariş bulunamadı.</p>
      ) : (
        <div className="space-y-6 max-w-5xl mx-auto">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <div className="space-y-2 text-sm text-gray-900 dark:text-gray-200">
                <p><strong>Sipariş ID:</strong> {order.id}</p>
                <p><strong>Kullanıcı:</strong> {order.userEmail}</p>
                <p><strong>Tarih:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Durum:</strong> {order.statusDisplayName || order.status}</p>
                <p><strong>Toplam Tutar:</strong> ₺{order.totalAmount.toFixed(2)}</p>
                <p>
                  <strong>Kargo Durumu:</strong>{' '}
                  <span className={`font-semibold ${getStatusColor(order.shippingStatus)}`}>
                    {getShippingStatusLabel(order.shippingStatus)}
                  </span>
                </p>
              </div>

              <div className="mt-4 flex flex-col md:flex-row md:items-center gap-3">
                <select
                  value={shippingUpdates[order.id] || order.shippingStatus || ''}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="border border-gray-300 dark:border-gray-600 p-2 rounded-xl shadow-sm focus:ring-[#3ABEFF] focus:outline-none bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
                >
                  <option value="PENDING">Hazırlanıyor</option>
                  <option value="SHIPPED">Kargoda</option>
                  <option value="DELIVERED">Teslim Edildi</option>
                </select>

                <button
                  onClick={() => updateShippingStatus(order.id)}
                  className="bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white px-4 py-2 rounded-full shadow-md transition"
                >
                  Güncelle
                </button>
              </div>

              <div className="mt-5">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">Ürünler:</p>
                <ul className="list-disc list-inside text-sm text-gray-800 dark:text-gray-300">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.productName} - {item.quantity} x ₺{item.price.toFixed(2)} = ₺{item.totalPrice.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
