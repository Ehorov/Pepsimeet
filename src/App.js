import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Form from "./components/Form/Form";
import TelegramSender from "./components/TelegramSender/TelegramSender";
import Button from "./components/Button/Button";
import s from "./app.module.css";

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    comment: "",
  });

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className={s.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pepsi meet</title>
        <link rel="canonical" href="http://pepsimeet.vercel.app/" />
        <meta name="description" content="Map" />
      </Helmet>
      <img src="/background.svg" alt="Pepsi" className={s.backgroundImg} />
      {isFormOpen ? (
        <Form
          formData={formData}
          setFormData={setFormData}
          setIsFormOpen={setIsFormOpen}
        />
      ) : (
        <div>
          <TelegramSender formData={formData} setIsFormOpen={setIsFormOpen} />
        </div>
      )}
      <Button onClick={toggleForm} />
    </div>
  );
};

export default App;
