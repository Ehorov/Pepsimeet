import React, { useState, useEffect } from "react";
import s from "./Form.module.css";
import Modal from "../Modal/Modal";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsModalOpen(true);
    setFormResult(formData);
    console.log(formData);

    // відправляємо повідомлення в телеграм
    const res = await fetch("/api/send-telegram-message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      console.log("Telegram message sent!");
    } else {
      console.error("Error sending telegram message!");
    }

    setIsModalOpen(false);
    setIsFormOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsFormOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.querySelector(".modal");
      if (modal && !modal.contains(event.target)) {
        setIsModalOpen(false);
        setIsFormOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsFormOpen, setIsModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div className={s.modalContent}>
            <h2>Your date is confirmed!</h2>
            <p>Name: {formResult.name}</p>
            <p>Date: {formResult.date}</p>
            <p>Time: {formResult.time}</p>
            <p>Comment: {formResult.comment}</p>
            <TelegramSender formData={formResult} />
          </div>
        </Modal>
      )}

      <form className={s.form} onSubmit={handleSubmit}>
        <h1>Get a date</h1>

        <input
          type="name"
          name="name"
          value={formData.name}
          placeholder="Nickname, @"
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
