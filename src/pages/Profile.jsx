import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import API from '../services/api';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/user/me');
        setProfile(response.data);
      } catch (error) {
        setError('Profil bilgisi alınamadı. Lütfen giriş yapınız...');
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#111827] flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-[#1e293b] p-10 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700 w-full max-w-lg text-center">
        <img
          src="/default-profile.png"
          alt="Profil"
          className="w-24 h-24 rounded-full mx-auto mb-4 border border-gray-300 dark:border-gray-600"
        />
        <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-2">
          Profil Bilgileri
        </h2>

        {error ? (
          <p className="text-red-500 font-medium mt-4">{error}</p>
        ) : !profile ? (
          <p className="text-gray-500 dark:text-gray-300">Yükleniyor...</p>
        ) : (
          <div className="text-left mt-6 space-y-3 text-sm text-gray-800 dark:text-gray-200">
            <p><strong>📧 E-posta:</strong> {profile.email}</p>
            {profile.name && <p><strong>👤 İsim:</strong> {profile.name}</p>}
            {profile.customerType && <p><strong>🔖 Kullanıcı Tipi:</strong> {profile.customerType}</p>}
            {profile.createdAt && (
              <p>
                <strong>📅 Kayıt Tarihi:</strong>{' '}
                {new Date(profile.createdAt).toLocaleDateString('tr-TR')}
              </p>
            )}
          </div>
        )}

        <button
          className="mt-6 px-6 py-2 bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white rounded-full shadow transition"
          onClick={() => toast.info('Bu buton gelecekte şifre güncelleme için kullanılabilir.')}
        >
          Şifreyi Güncelle
        </button>
      </div>
    </div>
  );
}

export default Profile;
