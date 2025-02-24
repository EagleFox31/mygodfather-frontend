import React from "react";
import SidebarRH from "../components/SidebarRH";
import Card from "../components/UI/Card";

const DashboardMentor = () => {
  return (
    <div className="d-flex">
      <SidebarRH />
      <div className="container mt-3 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-primary text-3xl font-bold">Tableau de Bord Mentor</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <Card title="Nombre de Mentorés">
            <p className="text-3xl font-bold text-secondary-3">4</p>
          </Card>
          <Card title="Sessions Réalisées">
            <p className="text-3xl font-bold text-secondary-2">8</p>
          </Card>
          <Card title="Taux de Satisfaction">
            <p className="text-3xl font-bold text-alert">90%</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardMentor;
