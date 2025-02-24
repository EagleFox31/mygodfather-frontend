// src/App.js
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  BarChart3,
  Microscope,
  Rocket,
  UserPlus2,
  Brain,
  Target,
  Globe2,
  Sun,
  Moon
} from 'lucide-react';

// === FRAMER MOTION IMPORTS ===
import { motion, useScroll, useTransform } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext'; // Hook pour la langue
import { useTheme } from '../context/ThemeContext';       // Hook pour le thème
import { translations } from './translations';
import Login from './Login';
import { useAuth } from '../context/AuthContext';

// Import du layout et du Dashboard Admin
import AdminLayout from '../components/layout/AdminLayout';
import DashboardAdmin from '../pages/admin/Dashboard'; // Assurez-vous que ce fichier existe

function App() {
  const navigate = useNavigate();

  // Récupération du contexte langue et thème
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  // Récupération des traductions
  const t = translations[language] || translations.en;

  // Noms affichés dans le dropdown pour changer la langue
  const languageNames = {
    en: 'English',
    fr: 'Français',
    zh: '中文',
    ja: '日本語',
    ar: 'العربية'
  };

  const getThemeClasses = () => {
    const baseClasses = 'min-h-screen transition-colors duration-300';
    if (theme === 'dark') {
      return `${baseClasses} bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1f35] to-slate-900`;
    }
    return `${baseClasses} bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-[#f0f2f8] to-slate-100`;
  };

  // Récupération du contexte d'authentification
  const { isAuthenticated, userRole } = useAuth();

  // === RÉCUPÉRATION DU SCROLL AVEC FRAMER MOTION ===
  const { scrollY } = useScroll();

  // Parallax du background : quand scrollY va de 0 à 300, la position Y va de 0 à 150
  const parallaxY = useTransform(scrollY, [0, 300], [0, 150]);

  // Optionnel : animer aussi l'opacité et le scale du texte
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <Routes>
      {/* Route pour Login */}
      <Route path="/login" element={<Login theme={theme} />} />

      {/* Route dédiée au Dashboard Admin */}
      <Route
        path="/dashboard"
        element={
          isAuthenticated && userRole === "Admin" ? (
            <AdminLayout>
              <DashboardAdmin />
            </AdminLayout>
          ) : (
            // Optionnel : message d'erreur ou redirection si l'accès est interdit
            <div
              className={`${getThemeClasses()} ${
                language === 'ar' ? 'rtl' : 'ltr'
              } flex items-center justify-center`}
            >
              <h2 className="text-2xl font-bold">
                Accès non autorisé. Veuillez vous connecter en tant qu'administrateur.
              </h2>
            </div>
          )
        }
      />

      {/* Catch-all route pour tout le reste : Landing Page */}
      <Route
        path="*"
        element={
          <div
            className={`${getThemeClasses()} ${
              language === 'ar' ? 'rtl' : 'ltr'
            }`}
          >
            {/* Hero Section */}
            <header className="sticky top-0 z-50">
              <div
                className={`absolute inset-0 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-b from-black/30 to-transparent'
                    : 'bg-gradient-to-b from-white/30 to-transparent'
                } pointer-events-none`}
              />
              <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-[#DBC078] rounded-lg blur opacity-30 transition duration-1000 group-hover:opacity-100"></div>
                    <Users className="relative h-10 w-10 text-[#DBC078]" />
                  </div>
                  <span
                    className={`font-bold text-2xl bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'from-white to-white/80'
                        : 'from-slate-800 to-slate-600'
                    } text-transparent bg-clip-text`}
                  >
                    MY GODFATHER
                  </span>
                </div>

                {/* Barre d'actions (thème, langue, navigation) */}
                <div className="flex items-center space-x-6">
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full ${
                      theme === 'dark'
                        ? 'bg-white/10 hover:bg-white/20'
                        : 'bg-slate-200 hover:bg-slate-300'
                    } transition-all duration-200`}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-5 w-5 text-white" />
                    ) : (
                      <Moon className="h-5 w-5 text-slate-800" />
                    )}
                  </button>

                  {/* Dropdown pour changer la langue */}
                  <div className="relative group">
                    <button
                      className={`flex items-center space-x-2 px-4 py-2 ${
                        theme === 'dark'
                          ? 'text-white/80 hover:text-white'
                          : 'text-slate-600 hover:text-slate-800'
                      } transition-all`}
                    >
                      <Globe2 className="h-5 w-5" />
                      <span>{languageNames[language]}</span>
                    </button>
                    <div
                      className={`absolute right-0 mt-2 w-48 ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-white'
                      } backdrop-blur-xl rounded-lg shadow-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}
                    >
                      {Object.entries(languageNames).map(([code, name]) => (
                        <button
                          key={code}
                          onClick={() => setLanguage(code)}
                          className={`w-full px-4 py-2 text-left ${
                            theme === 'dark'
                              ? 'text-white/80 hover:text-white hover:bg-white/10'
                              : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                          } transition-all`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Boutons de navigation */}
                  <button
                    className={`px-4 py-2 ${
                      theme === 'dark'
                        ? 'text-white/80 hover:text-white'
                        : 'text-slate-600 hover:text-slate-800'
                    } transition-all hover:scale-105`}
                  >
                    {t.nav.features}
                  </button>
                  <button
                    className={`px-4 py-2 ${
                      theme === 'dark'
                        ? 'text-white/80 hover:text-white'
                        : 'text-slate-600 hover:text-slate-800'
                    } transition-all hover:scale-105`}
                  >
                    {t.nav.about}
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="px-6 py-3 bg-[#DBC078] text-white rounded-lg hover:bg-[#c5ad6a] transition-all hover:scale-105 shadow-lg shadow-[#DBC078]/20"
                  >
                    {t.nav.getStarted}
                  </button>
                </div>
              </nav>
            </header>

            {/* Hero Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 overflow-hidden">
              {/*
                On utilise motion.div pour le background,
                avec style={{ y: parallaxY }} pour l'effet parallax
              */}
              <motion.div
                style={{ y: parallaxY }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=2000')] bg-cover opacity-5 will-change-transform"
              />

              {/* On applique heroOpacity et heroScale pour animer le texte */}
              <motion.div
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="relative text-center z-10"
              >
                <h1 className="text-5xl font-bold sm:text-6xl md:text-7xl">
                  <span
                    className={`bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'from-white via-white to-white/80'
                        : 'from-slate-800 via-slate-700 to-slate-600'
                    } text-transparent bg-clip-text`}
                  >
                    {t.hero.title}
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#DBC078] to-[#c5ad6a] text-transparent bg-clip-text">
                    {t.hero.subtitle}
                  </span>
                </h1>
                <p
                  className={`mt-6 max-w-3xl mx-auto text-lg sm:text-xl ${
                    theme === 'dark' ? 'text-gray-300/90' : 'text-slate-600'
                  } leading-relaxed`}
                >
                  {t.hero.description}
                </p>
                <div className="mt-10 flex justify-center">
                  <button
                    onClick={() => navigate('/login')}
                    className="group relative px-8 py-4 bg-[#DBC078] text-white rounded-xl hover:bg-[#c5ad6a] transition-all hover:scale-105 shadow-lg shadow-[#DBC078]/20"
                  >
                    <div className="absolute -inset-1 bg-[#DBC078] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
                    <div className="relative flex items-center space-x-2">
                      <Microscope className="w-6 h-6" />
                      <span className="text-lg font-medium">{t.nav.getStarted}</span>
                    </div>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Features */}
            <div className="relative py-32 overflow-hidden">
              <div className="absolute inset-0 bg-[#DBC078]/5 backdrop-blur-3xl" />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2
                    className={`text-4xl font-bold bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'from-white to-white/80'
                        : 'from-slate-800 to-slate-600'
                    } text-transparent bg-clip-text`}
                  >
                    {t.features.title}
                  </h2>
                  <p
                    className={`mt-4 text-xl ${
                      theme === 'dark' ? 'text-gray-300/90' : 'text-slate-600'
                    }`}
                  >
                    {t.features.subtitle}
                  </p>
                </div>

                <div className="mt-24 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { icon: Brain, key: 'smartMatching' },
                    { icon: MessageSquare, key: 'integratedChat' },
                    { icon: BarChart3, key: 'hrDashboard' },
                    { icon: UserPlus2, key: 'easyOnboarding' },
                    { icon: Target, key: 'goalTracking' },
                    { icon: Rocket, key: 'quickIntegration' }
                  ].map((feature, index) => (
                    <Feature
                      key={index}
                      icon={<feature.icon className="h-8 w-8 text-[#DBC078]" />}
                      title={t.features.items[feature.key].title}
                      description={t.features.items[feature.key].description}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="relative py-32">
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent ${
                  theme === 'dark' ? 'via-black/30' : 'via-slate-200/30'
                } to-transparent`}
              />
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2
                    className={`text-4xl font-bold bg-gradient-to-r ${
                      theme === 'dark'
                        ? 'from-white to-white/80'
                        : 'from-slate-800 to-slate-600'
                    } text-transparent bg-clip-text`}
                  >
                    {t.testimonials.title}
                  </h2>
                  <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {t.testimonials.items.map((testimonial, index) => (
                      <div key={index} className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#DBC078] to-[#c5ad6a] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
                        <div
                          className={`relative p-8 ${
                            theme === 'dark' ? 'bg-white/[0.03]' : 'bg-white'
                          } backdrop-blur-xl rounded-2xl border ${
                            theme === 'dark'
                              ? 'border-white/10 hover:border-white/20'
                              : 'border-slate-200 hover:border-slate-300'
                          } transition-all duration-500 hover:scale-[1.02]`}
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <h3
                                className={`text-lg font-semibold ${
                                  theme === 'dark' ? 'text-white' : 'text-slate-800'
                                }`}
                              >
                                {testimonial.name}
                              </h3>
                              <p
                                className={
                                  theme === 'dark'
                                    ? 'text-sm text-gray-300'
                                    : 'text-sm text-slate-600'
                                }
                              >
                                {testimonial.role}
                              </p>
                              <p className="text-sm text-[#DBC078]">
                                {testimonial.company}
                              </p>
                            </div>
                          </div>
                          <blockquote
                            className={`mt-6 ${
                              theme === 'dark' ? 'text-gray-300/90' : 'text-slate-600'
                            } italic`}
                          >
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer
              className={`relative ${
                theme === 'dark' ? 'bg-black/30' : 'bg-white/70'
              } backdrop-blur-xl border-t ${
                theme === 'dark' ? 'border-white/5' : 'border-slate-200'
              }`}
            >
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-[#DBC078] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
                      <Users className="relative h-10 w-10 text-[#DBC078]" />
                    </div>
                    <span
                      className={`text-xl font-bold bg-gradient-to-r ${
                        theme === 'dark' ? 'from-white to-white/80' : 'from-slate-800 to-slate-600'
                      } text-transparent bg-clip-text`}
                    >
                      MY GODFATHER
                    </span>
                  </div>
                  <div
                    className={
                      theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                    }
                  >
                    © 2025 MY GODFATHER. All rights reserved.
                  </div>
                </div>
              </div>
            </footer>
          </div>
        }
      />
    </Routes>
  );
}

// PETIT COMPOSANT POUR AFFICHER LES FEATURES
function Feature({ icon, title, description, theme }) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#DBC078] to-[#c5ad6a] rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-1000"></div>
      <div
        className={`relative p-8 ${
          theme === 'dark' ? 'bg-white/[0.03]' : 'bg-white'
        } backdrop-blur-xl rounded-2xl border ${
          theme === 'dark'
            ? 'border-white/10 hover:border-white/20'
            : 'border-slate-200 hover:border-slate-300'
        } transition-all duration-500 hover:scale-[1.02]`}
      >
        <div className="absolute top-8 left-8">{icon}</div>
        <div className="mt-16">
          <h3
            className={`text-xl font-semibold bg-gradient-to-r ${
              theme === 'dark'
                ? 'from-white to-white/80'
                : 'from-slate-800 to-slate-600'
            } text-transparent bg-clip-text`}
          >
            {title}
          </h3>
          <p
            className={`mt-4 text-base ${
              theme === 'dark' ? 'text-gray-300/90' : 'text-slate-600'
            } leading-relaxed`}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
