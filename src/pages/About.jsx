import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] dark:from-gray-900 dark:to-gray-800 px-6 py-16 flex items-center justify-center">
      <div className="max-w-3xl bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-10 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold mb-6 text-center">Hakkımızda</h1>
        <p className="mb-4 text-lg leading-relaxed">
          <strong>Cleanaura</strong>, 2025 yılında bireysel ve kurumsal kullanıcılar için kaliteli hijyen ürünleri sunma amacıyla kurulmuştur. 
          Özellikle <span className="text-blue-500">COVID-19 süreci</span> sonrasında artan temizlik ihtiyacına cevap verebilmek adına yola çıktık.
        </p>
        <p className="mb-4 text-lg leading-relaxed">
          Ürün yelpazemiz arasında maskeler, dezenfektanlar, sabunlar ve yüzey temizleyiciler bulunmaktadır. 
          Hem bireysel kullanıcıların hem de okullar, hastaneler gibi kurumların toplu alımlarına özel indirim ve kampanya seçenekleri sunuyoruz.
        </p>
        <p className="text-lg leading-relaxed">
          Müşteri memnuniyetini her zaman ön planda tutan Cleanaura, güçlü stok yapısı ve hızlı kargo sistemi ile güvenli alışveriş deneyimi sağlar.
        </p>
      </div>
    </div>
  );
}

export default About;
