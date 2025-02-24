// src/components/layout/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Users, Settings, FileText, ArrowLeft } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../pages/translations'; // Ajustez le chemin selon votre organisation

const Sidebar = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language] || translations.en;
  const location = useLocation();

  // Définition des éléments du menu
  const menuItems = [
    {
      label: t.admin?.dashboard || 'Dashboard',
      path: '/admin/dashboard',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      label: t.admin?.users || 'Users',
      path: '/admin/users',
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: t.admin?.settings || 'Settings',
      path: '/admin/settings',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      label: t.admin?.pairs || 'Pairs',
      path: '/admin/pairs',
      icon: <Users className="h-5 w-5" />, // Vous pouvez choisir une autre icône pour les paires
    },
    {
      label: t.admin?.reports || 'Reports',
      path: '/admin/reports',
      icon: <FileText className="h-5 w-5" />,
    },
  ];

  return (
    <aside
      className={`h-full w-64 p-4 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-slate-800'
      } shadow-lg`}
    >
      <div className="mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-[#DBC078]" />
          <span className="font-bold text-xl">MY GODFATHER Admin</span>
        </Link>
      </div>
      <nav>
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#DBC078] text-white'
                  : theme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
