import React, { useState, useRef, useEffect } from "react";
import s from "./Form.module.css";
import TelegramSender from "../TelegramSender/TelegramSender";
import CurfewWarning from "../CurfewWarning/CurfewWarning";
import Weather from "../Weather/Weather";
import Counter from "../Counter/Counter";

const Form = ({ setIsFormOpen }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    startTime: "",
    endTime: "",
    comment: "",
  });
  const [weatherData, setWeatherData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formResult, setFormResult] = useState(null);
  const [isCurfewWarningOpen, setIsCurfewWarningOpen] = useState(false);
  const [interval, setInterval] = useState(null);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    if (formData.date && formData.startTime && formData.endTime) {
      setWeatherData({
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });
      const start = new Date(`2023-01-01T${formData.startTime}`);
      const end = new Date(`2023-01-01T${formData.endTime}`);
      const interval = Math.abs(end.getTime() - start.getTime());

      setInterval(interval);
    }
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const modifiedFormData = {
      ...formData,
      name: formData.name.startsWith("@") ? formData.name : `@${formData.name}`,
    };

    const startHour = parseInt(formData.startTime.slice(0, 2));
    if (startHour >= 0 && startHour < 5) {
      setIsCurfewWarningOpen(true);
    } else {
      setIsCurfewWarningOpen(false);

      setIsModalOpen(true);
      setFormResult(modifiedFormData);
    }
  };

  const formRef = useRef({});

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

  const currentDate = new Date();
  const maxDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const minDate = currentDate;

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const minTime = `${currentHour.toString().padStart(2, "0")}:${currentMinute
    .toString()
    .padStart(2, "0")}`;

  const maxTime = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000);
  const maxTimeISO = maxTime.toTimeString().slice(0, 5);

  return (
    <>
      {isModalOpen && formResult && (
        <div>
          <TelegramSender
            formResult={formResult}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      )}
      <Weather startTime={formData.startTime} date={formData.date} />

      <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
        <h1>Get a date</h1>

        <input
          type="name"
          name="name"
          value={formData.name}
          placeholder="Nickname"
          autoComplete="on"
          maxLength="27"
          required
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          required
          max={maxDate}
          min={minDate}
          onChange={handleChange}
        />
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          required
          min={minTime}
          onChange={handleChange}
        />
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          max={maxTimeISO}
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
        {isCurfewWarningOpen && (
          <CurfewWarning
            key="curfew-warning"
            setIsCurfewWarningOpen={setIsCurfewWarningOpen}
          />
        )}
      </form>
      <Counter interval={interval} />
    </>
  );
};
export default Form;
