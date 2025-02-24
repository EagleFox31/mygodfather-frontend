import React, { useState, useEffect } from "react";
import SidebarRH from "../components/SidebarRH";
import MentoratList from "../components/MentoratList";
import StatsRH from "../components/StatsRH";
import Spinner from "../components/UI/Spinner";

const DashboardRH = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="d-flex">
      <SidebarRH />
      <div className="container mt-3 bg-white shadow-md p-4 rounded-lg">
        <h2 className="text-primary text-3xl font-bold">Tableau de bord RH</h2>
        {loading ? <Spinner /> : (
          <>
            <StatsRH />
            <MentoratList />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardRH;
