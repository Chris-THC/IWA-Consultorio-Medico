import React from "react";
import { Route, Routes } from "react-router-dom";
import { PersonalDates } from "./routes/PersonalDates";
import { PersonalHistory } from "./routes/PersonalHistory";
import { PersonalPrescriptions } from "./routes/PersonalPrescriptions";
import { Personalformation } from "./routes/Personalformation";
import { Tabs } from "./Tabs";

export const TabsConteiner = () => {
  return (
    <div>
      <Tabs />
      <Routes>
        <Route path="/" element={<Personalformation />} />
        <Route path="/medical/dates" element={<PersonalDates />} />
        <Route
          path="/medical/prescriptions"
          element={<PersonalPrescriptions />}
        />
        <Route path="/medical/history" element={<PersonalHistory />} />
        <Route
          path="/*"
          element={<div>Error 404 Not Found Page</div>}
        />
      </Routes>
    </div>
  );
};
