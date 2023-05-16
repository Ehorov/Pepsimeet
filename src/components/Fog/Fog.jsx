import React from "react";
import s from "./Fog.module.css";

const Fog = () => {
  return (
    <div className={s.fog}>
      <div className={s.fog_container}>
        <div className={s.fog_img}>
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-1.png"}
            alt="Fog-1"
            className={s.fog_img_first}
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-2.png"}
            alt="Fog-2"
            className={s.fog_img_second}
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-3.png"}
            alt="Fog-3"
            className={s.fog_img_third}
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-4.png"}
            alt="Fog-4"
            className={s.fog_img_fourth}
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-5.png"}
            alt="Fog-5"
            className={s.fog_img_fifth}
          />
          <img
            src={process.env.PUBLIC_URL + "/weather/fog/fog-6.png"}
            alt="Fog-6"
            className={s.fog_img_sixth}
          />
        </div>
      </div>
    </div>
  );
};

export default Fog;
