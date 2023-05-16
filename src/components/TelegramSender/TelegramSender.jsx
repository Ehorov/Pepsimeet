import React, { useState } from "react";
import Counter from "../Counter/Counter";

const TelegramSender = ({ formResult, setIsFormOpen }) => {
  const [isSending, setIsSending] = useState(true);
  console.log(Counter);
  const sendMessage = async () => {
    try {
      if (!formResult) return;
      const res = await fetch(
        `https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
            text: `${formResult.name} wants to meet you on ${
              formResult.date
            } at ${formResult.startTime} for ${Counter()} cans of Pepsi`,
          }),
        }
      );

      if (res.ok) {
        console.log("Telegram message sent!");
        setIsSending(false);
        setIsFormOpen(false);
      } else {
        console.error("Error sending telegram message!");
      }
    } catch (error) {
      console.error("Error sending telegram message:", error);
    }
  };

  if (isSending) {
    sendMessage();
  }

  return <></>;
};
export default TelegramSender;
