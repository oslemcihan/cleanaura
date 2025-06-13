import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../services/api';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.warn("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      await API.post('/contact', {
        name,
        email,
        message
      });
      toast.success("Mesajınız başarıyla gönderildi!");
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      toast.error("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-gray-900 dark:to-gray-800 px-6 py-16 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-center">İletişim</h1>
        <p className="mb-6 text-center text-lg">
          Bizimle iletişime geçmekten çekinmeyin. Her türlü soru, öneri ya da iş birliği için aşağıdaki formu doldurabilirsiniz.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Adınız Soyadınız"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@mail.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Mesajınız</label>
            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <button type="submit" className="w-full bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white py-3 rounded-full font-medium shadow-md transition duration-300">
            Gönder
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>📧 E-posta: destek@cleanaura.com</p>
          <p>📞 Telefon: +90 212 000 00 00</p>
          <p>📍 Adres: İstanbul, Türkiye</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
