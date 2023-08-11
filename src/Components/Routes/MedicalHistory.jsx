import { useContext } from "react";
import { CrudMedicalHistory } from "../MedicalHistory/CrudMedicalHistory";
import { FloatingAlert } from "../../Alert/FloatingAlert";
import { GetTheAppContext } from "../../Context/AppContext";

export const MedicalHistory = () => {
  const { showFloatingAlert, handleCloseFloatAlert, textAlert } =
    useContext(GetTheAppContext);
  return (
    <div>
      <CrudMedicalHistory />
      <FloatingAlert
        show={showFloatingAlert}
        message={`¡${textAlert}!`}
        onClose={handleCloseFloatAlert}
      />
    </div>
  );
};
