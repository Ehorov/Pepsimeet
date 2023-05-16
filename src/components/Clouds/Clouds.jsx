import React from "react";
import s from "./Clouds.module.css";

const Clouds = () => {
  return (
    <div className={s.clouds}>
      <img
        src={process.env.PUBLIC_URL + "/weather/clouds/cloud1.png"}
        style={{ "--i": 1 }}
        alt="cloud1"
      />
      <img
        src={process.env.PUBLIC_URL + "/weather/clouds/cloud2.png"}
        style={{ "--i": 2 }}
        alt="cloud2"
      />
      <img
        src={process.env.PUBLIC_URL + "/weather/clouds/cloud3.png"}
        style={{ "--i": 3 }}
        alt="cloud3"
      />
      <img
        src={process.env.PUBLIC_URL + "/weather/clouds/cloud4.png"}
        style={{ "--i": 4 }}
        alt="cloud4"
      />
      <img
        src={process.env.PUBLIC_URL + "/weather/clouds/cloud5.png"}
        style={{ "--i": 5 }}
        alt="cloud5"
      />
    </div>
  );
};
export default Clouds;
