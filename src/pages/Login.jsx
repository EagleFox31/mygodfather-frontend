// src/pages/Login.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaUsers, FaEnvelope, FaLock, FaGoogle, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png";

// reCAPTCHA fictif pour la démo
const FakeRecaptcha = ({ onCheck }) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
    onCheck(!checked);
  };

  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-primary"
        checked={checked}
        onChange={handleCheck}
      />
      <span className="ml-2 text-sm text-gray-600">{t("recaptcha")}</span>
    </label>
  );
};

const Login = () => {
  const { t, i18n } = useTranslation();
  const [stepMFA, setStepMFA] = useState(false);
  const [recaptchaOk, setRecaptchaOk] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Simule la soumission du formulaire
  const onSubmit = (data) => {
    if (!recaptchaOk) return; // Bloque si on n'a pas coché le reCAPTCHA
    
    // Simule une vérification de mail/mot de passe
    if (data.email === "admin@entreprise.com" && data.password === "admin123") {
      // On simule l’activation d’un 2FA
      setStepMFA(true);
    } else {
      alert("Identifiants incorrects !");
    }
  };

  // Simule la vérification du code MFA
  const handleVerifyMFA = (e) => {
    e.preventDefault();
    // On considère toujours le code comme valide pour la démo
    alert("Connexion réussie avec MFA !");
    // Redirection, etc. : par ex. navigate("/dashboard")
  };

  // Animation Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.2, duration: 0.8 },
    },
  };

  return (
    <motion.div
      className="flex h-screen font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* SECTION GAUCHE : Formulaire principal */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center p-8 bg-gradient-to-tr from-primary to-secondary-1 overflow-hidden">
        {/* Ondes décoratives (SVG) */}
        <motion.div
          className="absolute top-0 left-0 opacity-30 pointer-events-none"
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="400" height="200">
            <circle cx="100" cy="100" r="100" fill="#FFF" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-0 right-0 opacity-30 pointer-events-none"
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <svg width="400" height="200">
            <circle cx="300" cy="100" r="100" fill="#FFF" />
          </svg>
        </motion.div>

        {/* Sélecteur de langue (en haut à droite) */}
        <div className="absolute top-4 right-4">
          <select
            className="border bg-white text-primary font-semibold px-2 py-1 rounded"
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            value={i18n.language}
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </div>

        {/* Formulaire dans un conteneur blanc */}
        <div className="relative z-10 w-full max-w-md bg-neutral-light p-8 rounded-lg shadow-xl">
          <div className="text-center mb-6">
            <img
              src={logo}
              alt="MY GODFATHER Logo"
              className="h-16 mx-auto mb-4"
            />
            {!stepMFA && (
              <h2 className="text-3xl font-bold text-primary">
                {t("loginTitle")}
              </h2>
            )}
            {stepMFA && (
              <h2 className="text-3xl font-bold text-primary">{t("verify")}</h2>
            )}
          </div>

          {/* Formulaire d’authentification */}
          {!stepMFA && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Champ Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("email")}
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    className={`w-full pl-10 pr-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-secondary-2 transition`}
                    placeholder="email@entreprise.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {t("email")} est requis
                  </p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("password")}
                </label>
                <div className="relative mt-1">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <FaLock />
                  </span>
                  <input
                    id="password"
                    type="password"
                    {...register("password", { required: true, minLength: 6 })}
                    className={`w-full pl-10 pr-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded focus:outline-none focus:ring-2 focus:ring-secondary-2 transition`}
                    placeholder="********"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {t("password")} est requis (6 caractères minimum)
                  </p>
                )}
              </div>

              {/* reCAPTCHA (fictif) */}
              <FakeRecaptcha onCheck={(ok) => setRecaptchaOk(ok)} />

              {/* Message d’erreur reCAPTCHA (si on veut en afficher un) */}
              {!recaptchaOk && (
                <p className="text-gray-500 text-xs mt-1">
                  {t("recaptcha")}
                </p>
              )}

              {/* Se souvenir / Mot de passe oublié */}
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center text-gray-600">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-primary"
                  />
                  <span className="ml-2">{t("rememberMe")}</span>
                </label>
                <a href="#" className="text-secondary-3 hover:underline">
                  {t("forgotPassword")}
                </a>
              </div>

              {/* Bouton Se connecter */}
              <button
                type="submit"
                disabled={!recaptchaOk}
                className="w-full py-2 bg-primary text-neutral-light font-semibold rounded hover:bg-secondary-3 transition duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {t("signIn")}
              </button>

              {/* Connexion sociale */}
              <div className="flex items-center justify-center my-4">
                <div className="border-b flex-grow mr-2 border-gray-300"></div>
                <span className="text-gray-500">{t("or")}</span>
                <div className="border-b flex-grow ml-2 border-gray-300"></div>
              </div>
              <div className="flex justify-between space-x-2">
                <button
                  type="button"
                  className="flex items-center justify-center w-1/2 bg-red-600 text-white py-2 rounded hover:bg-red-500 transition"
                >
                  <FaGoogle className="mr-2" />
                  {t("googleSignIn")}
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center w-1/2 bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  <FaGithub className="mr-2" />
                  {t("githubSignIn")}
                </button>
              </div>

              {/* Lien création de compte */}
              <div className="text-center mt-4">
                <span className="text-sm text-gray-500">
                  {t("newUser")}{" "}
                  <a href="#" className="text-secondary-3 hover:underline">
                    {t("createAccount")}
                  </a>
                </span>
              </div>
            </form>
          )}

          {/* Étape 2FA (MFA) */}
          {stepMFA && (
            <form onSubmit={handleVerifyMFA} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("codeMFA")}
                </label>
                <input
                  type="text"
                  className="mt-1 w-full py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-secondary-2"
                  placeholder="123456"
                  maxLength="6"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-neutral-light font-semibold rounded hover:bg-secondary-3 transition duration-300 transform hover:scale-105"
              >
                {t("verify")}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* SECTION DROITE : Informations & ambiance dynamique */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center items-center bg-primary p-16 relative overflow-hidden">
        {/* Séparateur diagonal */}
        <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="#FFFFFF" points="0,0 100,0 0,100" />
          </svg>
        </div>
        <motion.div
          className="relative z-10 text-center text-secondary-3"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center mb-4">
            <FaUsers className="mr-2 text-neutral-light text-2xl" />
            <h2 className="typewriter text-4xl font-bold text-neutral-light">
              {t("joinTitle")}
            </h2>
          </div>
          <p className="text-lg max-w-md mx-auto mb-6 text-neutral-light">
            {t("joinSubtitle")}
          </p>
          <div className="mt-8 flex space-x-4 justify-center">
            {/* Avatar 1 + tooltip */}
            <div className="relative group">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User 1"
                className="h-14 w-14 rounded-full border-2 border-neutral-light transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black px-2 py-1 rounded shadow text-xs">
                {t("userTooltip1")}
              </div>
            </div>
            {/* Avatar 2 + tooltip */}
            <div className="relative group">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="User 2"
                className="h-14 w-14 rounded-full border-2 border-neutral-light transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black px-2 py-1 rounded shadow text-xs">
                {t("userTooltip2")}
              </div>
            </div>
            {/* Avatar 3 + tooltip */}
            <div className="relative group">
              <img
                src="https://randomuser.me/api/portraits/men/53.jpg"
                alt="User 3"
                className="h-14 w-14 rounded-full border-2 border-neutral-light transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black px-2 py-1 rounded shadow text-xs">
                {t("userTooltip3")}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CSS pour l'effet machine à écrire */}
      <style>{`
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #fff; /* Curseur blanc */
          animation: typing 3s steps(30, end), blinkCaret 0.75s step-end infinite;
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blinkCaret {
          from, to { border-color: transparent; }
          50% { border-color: #fff; }
        }
      `}</style>
    </motion.div>
  );
};

export default Login;
