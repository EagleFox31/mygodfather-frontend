// src/components/layout/AdminLayout.js
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const AdminLayout = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <main className="flex-1 p-6 overflow-auto">
          {/* Ici s'affichera le contenu des pages d'administration */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
