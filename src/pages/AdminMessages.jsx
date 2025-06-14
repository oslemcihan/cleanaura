import { useEffect, useState } from 'react';
import API from '../services/api';

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get('/contact'); // Token otomatik eklenecek
        setMessages(res.data);
      } catch (err) {
        console.error('Mesajlar alınamadı:', err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-[#0f172a] dark:text-white mb-8">Gelen Mesajlar</h2>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Henüz mesaj yok.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl p-6 shadow">
              <p className="font-semibold text-[#0f172a] dark:text-white">{msg.name} ({msg.email})</p>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
