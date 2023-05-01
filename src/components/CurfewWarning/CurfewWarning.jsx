import React from "react";
import s from "./CurfewWarning.module.css";

const CurfewWarning = ({ setIsCurfewWarningOpen }) => {
  return (
    <div className={s.curfew_warning__content}>
      <div className={s.curfew_warning__header}>
        <div className={s.curfew_warning__header}>
          <span
            className={s.close}
            onClick={() => setIsCurfewWarningOpen(false)}
          >
            &times;
          </span>
          <h2>Curfew Warning</h2>
        </div>
        <div className={s.curfew_warning__body}>
          <p>Curfew! Choose another time.</p>
        </div>
      </div>
    </div>
  );
};

export default CurfewWarning;
