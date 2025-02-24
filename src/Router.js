import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import WelcomeScreen from "./pages/WelcomeScreen";
import Layout from "./components/Layout";
import AdminLayout from "./components/layout/AdminLayout";
import DashboardRH from "./pages/DashboardRH";
import DashboardMentor from "./pages/DashboardMentor";
import DashboardMentore from "./pages/DashboardMentore";
import DashboardAdmin from "./pages/admin/Dashboard";
import TestOnboardingSelector from "./TestOnboardingSelector"; // Import du sélecteur de test

const Router = ({ location }) => {
  const { isAuthenticated, hasCompletedOnboarding, userRole } = useAuth();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Accès public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Route de test pour l'onboarding */}
      <Route path="/test-onboarding" element={<TestOnboardingSelector />} />

      {/* Redirection onboarding */}
      <Route path="/onboarding" element={<Onboarding />} />

      {/* Welcome Screen après onboarding */}
      <Route
        path="/welcome"
        element={
          isAuthenticated && hasCompletedOnboarding ? (
            <WelcomeScreen />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* Gestion des dashboards selon le rôle */}
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? (
            hasCompletedOnboarding ? (
              userRole === "Admin" ? (
                // Pour l'admin, on utilise le layout dédié (avec Sidebar, Topbar, etc.)
                <AdminLayout>
                  <DashboardAdmin />
                </AdminLayout>
              ) : (
                // Pour les autres rôles, on utilise le layout habituel
                <Layout>
                  {userRole === "RH" && <DashboardRH />}
                  {userRole === "Mentor" && <DashboardMentor />}
                  {userRole === "Mentore" && <DashboardMentore />}
                </Layout>
              )
            ) : (
              <Navigate to="/welcome" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
};

export default Router;
