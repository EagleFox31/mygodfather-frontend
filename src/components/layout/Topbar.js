// src/components/layout/Topbar.js
import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Moon, Sun, Globe2, ArrowLeft } from 'lucide-react';
import { translations } from '../../pages/translations'; // Ajustez le chemin selon votre organisation
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const t = translations[language] || translations.en;
  const navigate = useNavigate();

  const languageNames = {
    en: 'English',
    fr: 'Français',
    zh: '中文',
    ja: '日本語',
    ar: 'العربية',
  };

  return (
    <header
      className={`flex items-center justify-between px-6 py-4 border-b ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-700 text-white'
          : 'bg-white border-slate-200 text-slate-800'
      }`}
    >
      <div className="flex items-center space-x-4">
        {/* Bouton Retour (si nécessaire) */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold">Dashboard Admin</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <div className="relative group">
          <button className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200">
            <Globe2 className="h-5 w-5" />
            <span>{languageNames[language]}</span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
