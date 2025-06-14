import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('/auth/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success('Giriş başarılı!');
      navigate('/');
    } catch (error) {
      toast.error('Giriş başarısız: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#111827] flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-[#1e293b] p-8 md:p-10 rounded-3xl shadow-xl border border-[#d1e3e2] dark:border-gray-700"
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-[#3ABEFF] dark:text-[#6FD9FF] drop-shadow-sm">
            Cleanaura
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Hijyenin zarafetine katılın
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            E-posta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none text-sm"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Şifre
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white text-gray-800 dark:bg-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-[#3ABEFF] focus:outline-none text-sm"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#3ABEFF] hover:bg-[#2FC3EC] text-white font-semibold py-3 rounded-full shadow-md transition duration-300"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
}

export default Login;
