import { useEffect, useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error('Ürünler getirilemedi!');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
    setName(product.name || '');
    setPrice(product.price || '');
    setDescription(product.description || '');
    setStock(product.stock || '');
    setImageUrl(product.imageUrl || '');
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/products/${editProduct.id}`, {
        name,
        price,
        description,
        stock,
        imageUrl,
      });
      toast.success('Ürün başarıyla güncellendi!');
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      toast.error('Güncelleme başarısız!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      try {
        await API.delete(`/products/${id}`);
        toast.success('Ürün başarıyla silindi!');
        fetchProducts();
      } catch (err) {
        toast.error('Silme işlemi başarısız!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <h2 className="text-3xl font-bold text-[#0f172a] dark:text-white mb-10 text-center">Ürün Listesi</h2>

      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-gray-700 text-center"
          >
            {editProduct?.id === product.id ? (
              <>
                <input
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  placeholder="Ürün Adı"
  className="w-full mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
/>

<input
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
  placeholder="Fiyat (₺)"
  className="w-full mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
/>

<input
  type="text"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Açıklama"
  className="w-full mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
/>

<input
  type="number"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
  placeholder="Stok Miktarı"
  className="w-full mb-2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
/>

<input
  type="text"
  value={imageUrl}
  onChange={(e) => setImageUrl(e.target.value)}
  placeholder="Görsel URL (https...)"
  className="w-full mb-4 p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-[#3ABEFF] bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
/>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleUpdate}
                    className="bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white px-4 py-2 rounded-full shadow"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setEditProduct(null)}
                    className="border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    İptal
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-[#10b981] font-medium mb-2">{product.price}₺</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{product.description}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white px-4 py-2 rounded-full shadow"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
