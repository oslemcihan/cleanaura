import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [customerType, setCustomerType] = useState('BIREYSEL');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', {
        email,
        password,
        customerType,
      });
      toast.success('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
      navigate('/login');
    } catch (error) {
      toast.error('Kayıt başarısız: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f6fbfa] via-white to-[#fce4ec] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md border border-[#d9e5e3] dark:border-gray-700"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#3ABEFF] dark:text-[#6FD9FF]">Cleanaura</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Yeni bir hesap oluşturun</p>
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Kullanıcı Tipi
          </label>
          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none"
            required
          >
            <option value="BIREYSEL">Bireysel</option>
            <option value="KURUMSAL">Kurumsal</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#3ABEFF] hover:bg-[#2FC3EC] text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default Register;
