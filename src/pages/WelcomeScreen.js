import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const roleDescription = {
    Admin: "Gérez les utilisateurs et paramètres.",
    RH: "Surveillez les mentorats et consultez les statistiques.",
    Mentor: "Accédez à votre liste de mentorés et planifiez vos sessions.",
    Mentore: "Consultez votre mentor et planifiez vos rendez-vous."
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-10">
      <h1 className="text-5xl font-bold text-gray-900">Bienvenue sur MY GODFATHER</h1>
      <p className="text-xl text-gray-700 mt-6">{roleDescription[userRole]}</p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white text-lg rounded-lg hover:bg-indigo-700 transition"
      >
        Accéder au tableau de bord
      </button>
    </div>
  );
};

export default WelcomeScreen;
