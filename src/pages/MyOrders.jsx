import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getMyOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#111827] px-6 py-12">
      <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-10 text-center">
        Siparişlerim
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300 text-sm">
          Henüz siparişiniz yok.
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700"
            >
              <div className="space-y-1 text-sm text-gray-800 dark:text-gray-200">
                <p><strong>Sipariş ID:</strong> {order.id}</p>
                <p><strong>Tarih:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Durum:</strong> {order.status}</p>
                <p><strong>Toplam Tutar:</strong> ₺{order.totalAmount.toFixed(2)}</p>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-[#0f172a] dark:text-white mb-1">Ürünler:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
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

export default MyOrders;
