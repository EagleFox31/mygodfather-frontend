import React from "react";
import Card from "../components/UI/Card";

const DashboardMentore = () => {
  return (
    <div className="container mt-5 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-primary text-3xl font-bold">Tableau de Bord Mentoré</h2>
      <Card title="Votre Mentor">
        <p className="text-xl text-secondary-3">Jean Dupont</p>
      </Card>
      <Card title="Prochaine Session">
        <p className="text-xl text-secondary-2">Mardi 10h00</p>
      </Card>
      <Card title="Évaluation">
        <p className="text-xl text-alert">À compléter</p>
      </Card>
    </div>
  );
};

export default DashboardMentore;
