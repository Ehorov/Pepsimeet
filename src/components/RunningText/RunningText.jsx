import React from "react";
import s from "./RunningText.module.css";

const RunningText = () => {
  return (
    <div className={s.running_text_container}>
      <span className={s.running_text}>Unknown Precipitation :(</span>
    </div>
  );
};

export default RunningText;
