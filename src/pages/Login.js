import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext'; // Import du contexte Auth
import { motion } from 'framer-motion';
import {
  Users,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Sun,
  Moon,
  Globe2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { translations } from './translations';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(''); // État pour afficher les erreurs

  // Récupération des contextes langue, thème et auth
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { login } = useAuth();

  // Utilisation d'un fallback au cas où la langue ne correspond pas
  const t = translations[language] || translations.en;

  // Noms affichés dans le dropdown pour changer la langue
  const languageNames = {
    en: 'English',
    fr: 'Français',
    zh: '中文',
    ja: '日本語',
    ar: 'العربية'
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulation d'un délai pour imiter un appel API (vous pouvez l'enlever ou l'ajuster)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Tentative de connexion avec le contexte Auth
    const success = login(email, password);

    setIsLoading(false);

    if (success) {
      // Redirigez l'utilisateur vers une page protégée, par exemple '/dashboard'
      navigate('/dashboard');
    } else {
      // Affiche un message d'erreur si l'authentification échoue
      setError(t.login.invalidCredentials || "Identifiants incorrects");
    }
  };

  // Variants pour les animations avec Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <div
      className={`min-h-screen ${
        theme === 'dark'
          ? 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-[#1a1f35] to-slate-900'
          : 'bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-[#f0f2f8] to-slate-100'
      } flex items-center justify-center p-4 ${
        language === 'ar' ? 'rtl' : 'ltr'
      }`}
    >
      {/* Bouton "Retour" */}
      <div className="absolute top-8 left-8 flex items-center space-x-4">
        <Link
          to="/"
          className={`flex items-center space-x-2 ${
            theme === 'dark'
              ? 'text-white/80 hover:text-white'
              : 'text-slate-600 hover:text-slate-800'
          } transition-all duration-200`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>{t.nav.back}</span>
        </Link>
      </div>

      {/* Boutons de changement de thème & de langue */}
      <div className="absolute top-8 right-8 flex items-center space-x-4">
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
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              theme === 'dark'
                ? 'text-white/80 hover:text-white bg-white/10 hover:bg-white/20'
                : 'text-slate-600 hover:text-slate-800 bg-slate-200 hover:bg-slate-300'
            } transition-all`}
          >
            <Globe2 className="h-5 w-5" />
            <span>{languageNames[language] || 'Unknown'}</span>
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
      </div>

      {/* Carte de login */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`w-full max-w-md ${
          theme === 'dark' ? 'bg-white/[0.03]' : 'bg-white'
        } backdrop-blur-xl p-8 rounded-2xl border ${
          theme === 'dark' ? 'border-white/10' : 'border-slate-200'
        } relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#DBC078]/10 to-transparent" />

        {/* Icône utilisateur */}
        <motion.div
          variants={itemVariants}
          className="relative flex justify-center mb-8"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-[#DBC078] rounded-full blur opacity-30"></div>
            <Users className="relative h-12 w-12 text-[#DBC078]" />
          </div>
        </motion.div>

        {/* Titre */}
        <motion.h2
          variants={itemVariants}
          className={`text-2xl font-bold text-center mb-8 bg-gradient-to-r ${
            theme === 'dark'
              ? 'from-white to-white/80'
              : 'from-slate-800 to-slate-600'
          } text-transparent bg-clip-text`}
        >
          {t.login.title}
        </motion.h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6 relative">
          {/* Email */}
          <motion.div variants={itemVariants}>
            <label
              className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-white/80' : 'text-slate-600'
              } mb-2`}
            >
              {t.login.email}
            </label>
            <div className="relative">
              <Mail
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-white/40' : 'text-slate-400'
                }`}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                } border focus:ring-2 focus:ring-[#DBC078] focus:border-transparent transition-all duration-200`}
                placeholder={t.login.emailPlaceholder}
              />
            </div>
          </motion.div>

          {/* Mot de passe */}
          <motion.div variants={itemVariants}>
            <label
              className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-white/80' : 'text-slate-600'
              } mb-2`}
            >
              {t.login.password}
            </label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                  theme === 'dark' ? 'text-white/40' : 'text-slate-400'
                }`}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-10 pr-12 py-2 rounded-lg ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                } border focus:ring-2 focus:ring-[#DBC078] focus:border-transparent transition-all duration-200`}
                placeholder={t.login.passwordPlaceholder}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                  theme === 'dark'
                    ? 'text-white/40 hover:text-white/60'
                    : 'text-slate-400 hover:text-slate-600'
                } transition-colors duration-200`}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </motion.div>

          {/* "Remember me" & "Forgot password?" */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between"
          >
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#DBC078] rounded border-gray-300 focus:ring-[#DBC078]"
              />
              <span
                className={`ml-2 text-sm ${
                  theme === 'dark' ? 'text-white/80' : 'text-slate-600'
                }`}
              >
                {t.login.rememberMe}
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-[#DBC078] hover:text-[#c5ad6a] transition-colors duration-200"
            >
              {t.login.forgotPassword}
            </a>
          </motion.div>

          {/* Affichage d'un message d'erreur en cas d'échec de connexion */}
          {error && (
            <motion.p
              variants={itemVariants}
              className="text-center text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}

          {/* Bouton "Sign In" */}
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className={`w-full relative group ${isLoading ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DBC078] to-[#c5ad6a] rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative px-6 py-3 bg-[#DBC078] text-white rounded-lg group-hover:bg-[#c5ad6a] transition-all duration-200 flex items-center justify-center">
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                t.login.signIn
              )}
            </div>
          </motion.button>

          {/* Lien "No Account? Sign up" */}
          <motion.p
            variants={itemVariants}
            className={`text-center text-sm ${
              theme === 'dark' ? 'text-white/60' : 'text-slate-500'
            }`}
          >
            {t.login.noAccount}{' '}
            <a
              // En cliquant sur ce lien, on navigue vers la page d'onboarding
              onClick={() =>
                navigate('/onboarding', { state: { role: 'mentee', theme, language } })
              }
              className="cursor-pointer text-[#DBC078] hover:text-[#c5ad6a] transition-colors duration-200"
            >
              {t.login.signUp}
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
