import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminMessages from './pages/AdminMessages';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Products from './pages/Products';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AddProduct from './components/AddProduct';
import AdminPanel from './pages/AdminPanel';
import MyOrders from './pages/MyOrders';
import AdminOrders from './pages/AdminOrders';
import LandingPage from './pages/LandingPage';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './components/ProductList'
import About from './pages/About';
import Contact from './pages/Contact';


function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);
  return (
    <BrowserRouter>
    
      <Navbar />
        
        <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/products" element={<ProductList />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

