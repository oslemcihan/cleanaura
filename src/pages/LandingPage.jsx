import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-[#f6fbfa] to-[#e6f2f0] text-[#1f2937] dark:from-[#0f172a] dark:to-[#1e293b] dark:text-white">
      
    
      <main className="text-center py-24 px-4 bg-gradient-to-br from-[#f0f8f7] to-[#e4eff0] rounded-b-3xl dark:from-[#1e293b] dark:to-[#0f172a]">
        <h2 className="text-5xl font-extrabold mb-5 text-[#0f172a] dark:text-white drop-shadow-sm">
          Hijyenin Zarafeti
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 text-gray-600 dark:text-gray-300">
          Cleanaura ile tanışın: Sağlığınızı ve yaşam alanınızı lüksle buluşturan hijyen ürünleri.
        </p>
        <Link
          to="/products"
          className="bg-[#3ABEFF] hover:bg-[#2fc3ec] text-white px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        >
          Alışverişe Başla
        </Link>
      </main>

      <section className="bg-white dark:bg-[#111827] py-20 px-6">
        <h3 className="text-3xl font-bold mb-12 text-center text-[#0f172a] dark:text-white tracking-tight">
          Neden Cleanaura?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "🌿 Doğal İçerikler", desc: "Paraben, sülfat ve katkı maddesi içermez." },
            { title: "🧪 Dermatolojik Testli", desc: "Cildinize dost, laboratuvar onaylı ürünler." },
            { title: "🎁 Modern Ambalaj", desc: "Estetik ve fonksiyonel şıklık her üründe." },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 bg-white dark:bg-[#1f2937] rounded-3xl shadow-xl border border-[#d9e5e3] dark:border-[#374151] hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 text-center"
            >
              <h4 className="text-xl font-bold text-[#111827] dark:text-white mb-2">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-6 border-t border-[#e2f0ed] dark:border-[#334155]">
        © 2025 <span className="font-semibold text-[#3ABEFF]">Cleanaura</span> — Hijyenin zarafetiyle.
      </footer>
    </div>
  );
};

export default LandingPage;
