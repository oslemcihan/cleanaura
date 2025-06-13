/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // BU SATIR ÇOK ÖNEMLİ
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3ABEFF',
        primaryHover: '#2FC3EC',
        background: '#F9FAFB',
        sectionBg: '#F3F4F6',
        textDark: '#1F2937',
        footer: '#6B7280',
      },
    },
  },
  plugins: [],
};
