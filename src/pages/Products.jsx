import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAllProducts,
  getFavorites,
  addFavorite,
  removeFavorite,
} from '../services/api';
import API from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      getAllProducts().then((res) => setProducts(res.data));
      getFavorites()
        .then((res) => {
          const ids = res.data.map((fav) => fav.product.id);
          setFavoriteIds(ids);
        })
        .catch(() => setFavoriteIds([]));
    }
  }, [navigate]);

  const toggleFavorite = async (productId) => {
    try {
      if (favoriteIds.includes(productId)) {
        await removeFavorite(productId);
        setFavoriteIds(favoriteIds.filter((id) => id !== productId));
      } else {
        await addFavorite(productId);
        setFavoriteIds([...favoriteIds, productId]);
      }
    } catch (err) {
      toast.error('Favori işlemi başarısız');
    }
  };

  const addToCart = (productId) => {
    const existing = cartItems.find((item) => item.productId === productId);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { productId, quantity: 1 }]);
    }
  };

  const handleOrderSubmit = async () => {
    if (cartItems.length === 0) return toast.warn('Sepet boş!');

    try {
      await API.post('/orders', { items: cartItems });
      toast.success('Sipariş başarıyla oluşturuldu!');
      setCartItems([]);
    } catch (error) {
      toast.error(
        'Sipariş başarısız: ' + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-[#1f2937] dark:to-[#111827] px-6 py-10">
      <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-10 text-center">
        Ürünler
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">Yükleniyor...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-[#1e293b] p-6 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-[#0f172a] dark:text-white">
                  {product.name}
                </h3>
                <p className="text-[#10b981] font-medium mt-1">₺{product.price}</p>
              </div>
              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="text-2xl hover:scale-110 transition"
                  title="Favorilere ekle"
                >
                  {favoriteIds.includes(product.id) ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => addToCart(product.id)}
                  className="px-5 py-2 bg-[#3ABEFF] hover:bg-[#2FC3EC] text-white rounded-full shadow transition"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-14 bg-white dark:bg-[#1e293b] p-8 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700 max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold mb-4 text-[#0f172a] dark:text-white text-center">
          Sepet
        </h3>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">Sepet boş</p>
        ) : (
          <ul className="mb-4 space-y-2 text-sm text-gray-700 dark:text-gray-200">
            {cartItems.map((item, index) => (
              <li key={index}>
                <span className="font-medium">Ürün ID:</span> {item.productId} —{' '}
                <span className="font-medium">Adet:</span> {item.quantity}
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={handleOrderSubmit}
          disabled={cartItems.length === 0}
          className={`w-full py-3 mt-4 rounded-full font-medium shadow transition ${
            cartItems.length === 0
              ? 'bg-gray-300 text-white cursor-not-allowed'
              : 'bg-[#3ABEFF] hover:bg-[#2FC3EC] text-white'
          }`}
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}

export default Products;
