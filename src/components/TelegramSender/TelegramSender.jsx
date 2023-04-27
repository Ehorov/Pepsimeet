import axios from "axios";
import React, { useState, useEffect } from "react";

const TelegramSender = ({ formData, onSent }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (isSent) {
      onSent();
    }
  }, [isSent, onSent]);

  const sendMessage = async () => {
    setIsSending(true);
    try {
      const { name, date, time, comment } = formData;
      const message = `New date request\nName: ${name}\nDate: ${date}\nTime: ${time}\nComment: ${comment}`;
      await axios.post(
        `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
          text: message,
        }
      );
      setIsSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      {isSending && <p>Sending message...</p>}
      {isSent && <p>Message sent to Telegram!</p>}
      {isSent && onSent && onSent()}
    </div>
  );
};

export default TelegramSender;
