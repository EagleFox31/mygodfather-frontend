import React, { createContext, useState, useContext } from "react";

// Création du contexte
const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  // Ajouter une notification avec une durée
  const addNotification = (message, type = "info", duration = 5000) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);

    // Suppression automatique après un certain temps
    setTimeout(() => removeNotification(id), duration);
  };

  // Supprimer une notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

// Hook personnalisé pour accéder au contexte
export function useNotification() {
  return useContext(NotificationContext);
}
