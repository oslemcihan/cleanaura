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
    <header className="bg-[#1f2937] text-white shadow-lg px-6 py-5 rounded-b-1xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-white">Cleanaura</h1>

        {/* Masaüstü Menü */}
        <div className="hidden md:flex gap-6 text-sm items-center">
          {navLinks}
          <ThemeToggle />
        </div>

        {/* Mobil Menü Butonu */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil Menü */}
      {isOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden text-sm">
          {navLinks}
          <ThemeToggle />
        </div>
      )}
    </header>
  );
}

export default Navbar;
