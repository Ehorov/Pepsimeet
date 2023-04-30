import React, { useState, useRef, useEffect } from "react";
import s from "./Form.module.css";
import TelegramSender from "../TelegramSender/TelegramSender";

const Form = ({ setIsFormOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    comment: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formResult, setFormResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    setFormResult(formData);
  };

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef, setIsFormOpen]);

  return (
    <>
      {isModalOpen && formResult && (
        <div className={s.modal}>
          <TelegramSender
            formResult={formResult}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}

      <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
        <h1>Get a date</h1>
        <input
          type="name"
          name="name"
          value={formData.name}
          placeholder="Nickname"
          autoComplete="true"
          maxLength="27"
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="comment"
          value={formData.comment}
          placeholder="Comment"
          maxLength="141"
          className={s.formComment}
          onChange={handleChange}
        />

        <button type="submit">Ok</button>
      </form>
    </>
  );
};

export default Form;
