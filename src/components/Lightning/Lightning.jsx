import React, { useState, useEffect } from "react";
import s from "./Lightning.module.css";

const Lightning = () => {
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    let timer;

    const generateRandomDelay = () => {
      return Math.floor(Math.random() * (13000 - 7000 + 1)) + 5000;
    };

    const triggerLightning = () => {
      setShowLightning(true);
      setTimeout(() => {
        setShowLightning(false);
        const delay = generateRandomDelay();
        timer = setTimeout(triggerLightning, delay);
      }, 100);
    };

    const initialDelay = generateRandomDelay();
    timer = setTimeout(triggerLightning, initialDelay);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${s["lightning-container"]}`}>
      {showLightning && (
        <div className={`${s["lightning-effect"]} ${s.show}`}></div>
      )}
    </div>
  );
};

export default Lightning;
