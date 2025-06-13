import { useState } from 'react';
import API from '../services/api'; 
import { toast } from 'react-toastify';

function ProfileEdit() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
        try {
      await API.put('/user/update-by-token', { email, password });
      toast.success('Profil başarıyla güncellendi!');
    } catch (error) {
      toast.error('Hata: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#111827] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-white dark:bg-[#1e293b] p-10 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700"
      >
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-6 text-center">
          Profil Güncelle
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Email
            </label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Yeni Şifre
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3ABEFF] hover:bg-[#2FC3EC] text-white py-3 rounded-full font-medium shadow-md transition duration-300"
          >
            Güncelle
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProfileEdit;
