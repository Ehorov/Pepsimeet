import React from "react";
import s from "./Button.module.css";

const Button = ({ onClick }) => {
  return (
    <button type="button" className={s.btnOpen} onClick={onClick}>
      <img src="/pepsi_logo.svg" alt="btn_open" className={s.btnLogo} />
    </button>
  );
};

export default Button;
