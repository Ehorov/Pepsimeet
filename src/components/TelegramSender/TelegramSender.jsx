import React, { useState } from "react";

const TelegramSender = ({ formResult, setIsFormOpen }) => {
  const [isSending, setIsSending] = useState(true);

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
            text: `New date request:\nName: @${formResult.name}\nDate: ${formResult.date}\nTime: ${formResult.time}\nComment: ${formResult.comment}`,
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
