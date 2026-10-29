import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Базовые фоновые оттенки (чистый белый и мягкие светлые подложки)
        background: {
          DEFAULT: '#FFFFFF',
          surface: '#F8FAF8',
          subtle: '#F1F4F1',
          muted: '#E6EBE6',
        },
        // Основной зеленый (субтропическая природа Абхазии, пальмы, эвкалипты)
        green: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
          DEFAULT: '#16A34A',
        },
        // Цвет мха (бархатистый лесной мох самшитовых рощ, реликтовых лесов Рицы)
        moss: {
          50: '#F5F7F2',
          100: '#E8EDE0',
          200: '#D2DDC3',
          300: '#B5C79E',
          400: '#96AF78',
          500: '#748D54',
          600: '#586F3E',
          700: '#435530',
          800: '#303D23',
          900: '#202917',
          DEFAULT: '#586F3E',
        },
        // Каменный серый (каменистые пляжи, известняковые ущелья, скалы и дольмены)
        'stone-gray': {
          50: '#F8F8F7',
          100: '#EFF0EE',
          200: '#E0E2DE',
          300: '#C6CAC3',
          400: '#A3A79E',
          500: '#7E8379',
          600: '#62665D',
          700: '#4B4E47',
          800: '#353732',
          900: '#20221E',
          DEFAULT: '#62665D',
        },
        // Псевдонимы бренда для гибкого использования
        brand: {
          primary: '#16A34A',
          'primary-dark': '#15803D',
          moss: '#586F3E',
          'moss-dark': '#435530',
          stone: '#62665D',
          'stone-light': '#C6CAC3',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        jakarta: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'monospace'],
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s infinite',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(32, 34, 30, 0.05)',
        'soft': '0 4px 20px -2px rgba(32, 34, 30, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(32, 34, 30, 0.12)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.08)',
        'moss-glow': '0 4px 20px -2px rgba(88, 111, 62, 0.25)',
        'green-glow': '0 4px 20px -2px rgba(22, 163, 74, 0.25)',
        'emerald-glow': '0 10px 25px -5px rgba(5, 150, 105, 0.4)',
        'emerald-glow-lg': '0 15px 30px -5px rgba(5, 150, 105, 0.5)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
