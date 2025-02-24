// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const users = {
  "admin@mygodfather.com": { role: "Admin", password: "Admin123!" },
  "hr@mygodfather.com": { role: "RH", password: "HR123!" },
  "mentor@mygodfather.com": { role: "Mentor", password: "Mentor123!" },
  "mentoree@mygodfather.com": { role: "Mentore", password: "Mentoree123!" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(
    () => JSON.parse(sessionStorage.getItem("hasCompletedOnboarding")) || false
  );

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("hasCompletedOnboarding", JSON.stringify(hasCompletedOnboarding));
  }, [user, hasCompletedOnboarding]);

  const login = (email, password) => {
    if (users[email] && users[email].password === password) {
      setUser({ email, role: users[email].role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setHasCompletedOnboarding(false);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("hasCompletedOnboarding");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasCompletedOnboarding,
        setHasCompletedOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
