import React from "react";
import s from "./Dust.module.css";

const Dust = () => {
  const getRandomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const createParticles = () => {
    const particles = [];

    for (let i = 0; i < 50; i++) {
      const particleStyle = {
        animationDelay: `${getRandomInRange(0, 5)}s`,
        top: `${getRandomInRange(0, 100)}%`,
        height: `${getRandomInRange(2, 6)}px`,
        width: `${getRandomInRange(2, 6)}px`,
      };

      particles.push(
        <div key={i} className={s["dust-particle"]} style={particleStyle}></div>
      );
    }

    return particles;
  };

  return <div className={s["dust-container"]}>{createParticles()}</div>;
};

export default Dust;
