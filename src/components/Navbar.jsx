import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getRoleFromToken } from '../utils/jwtDecode';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const [role, setRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userRole = getRoleFromToken();
    setRole(userRole);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setRole(null);
    navigate('/login');
  };

  const navLinks = (
    <>
      <Link to="/" className="hover:text-[#6FD9FF] transition">Anasayfa</Link>
      <Link to="/products" className="hover:text-[#6FD9FF] transition">Ürünler</Link>
      <Link to="/about" className="hover:text-[#6FD9FF] transition">Hakkımızda</Link>
      <Link to="/contact" className="hover:text-[#6FD9FF] transition">İletişim</Link>

      {role && (
        <>
          <Link to="/profile" className="hover:text-[#6FD9FF] transition">Profil</Link>
          <Link to="/orders" className="hover:text-[#6FD9FF] transition">Siparişlerim</Link>
          {role === 'ADMIN' && (
            <>
              <Link to="/admin/orders" className="hover:text-[#6FD9FF] transition">Sipariş Yönetimi</Link>
              <Link to="/admin" className="hover:text-[#6FD9FF] transition">Admin Paneli</Link>
              <Link to="/admin/add-product" className="hover:text-[#6FD9FF] transition">Ürün Ekle</Link>
              <Link to="/admin/products" className="hover:text-[#6FD9FF] transition">Ürün Yönetimi</Link>
              <Link to="/admin/messages" className="hover:text-[#6FD9FF] transition">Mesajlar</Link> {/* ✅ Yeni eklendi */}
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow transition"
          >
            Çıkış
          </button>
        </>
      )}

      {!role && (
        <>
          <Link to="/login" className="bg-[#6FD9FF] hover:bg-[#3ABEFF] text-white px-4 py-2 rounded-full shadow transition">
            Giriş
          </Link>
          <Link to="/register" className="border border-[#6FD9FF] text-[#6FD9FF] px-4 py-2 rounded-full hover:bg-[#1f2937] hover:border-white transition">
            Kayıt Ol
          </Link>
        </>
      )}
    </>
  );

  return (
  <header className="bg-[#1f2937] dark:bg-gray-900 text-white shadow-lg px-6 py-4">
    <div className="flex justify-between items-center gap-6">
      <div className="flex items-center">
        <Link to="/">
          <h1 className="text-2xl lg:text-3xl font-extrabold text-white pr-6 hover:text-[#3ABEFF] transition">
            Cleanaura
          </h1>
        </Link>
      </div>

      {/* Masaüstü Menü */}
      <nav className="hidden lg:flex gap-4 items-center text-sm">
        {navLinks}
        <ThemeToggle />
      </nav>

      {/* Mobil Menü Butonu + Tema */}
      <div className="lg:hidden flex items-center gap-3">
        <ThemeToggle />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </div>

    {/* Mobil Menü Açılır */}
    {isOpen && (
      <div className="flex flex-col gap-3 mt-4 lg:hidden text-sm">
        {navLinks}
      </div>
    )}
  </header>
);
}

export default Navbar;
