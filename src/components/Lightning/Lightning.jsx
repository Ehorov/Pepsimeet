import { useState, useEffect } from "react";

const Lightning = () => {
  const [current, setCurrent] = useState(0);
  const images = [
    "lightning1.png",
    "lightning2.png",
    "lightning3.png",
    "lightning4.png",
    "lightning5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev === images.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="lightning">
      {images.map((image, index) => (
        <img
          key={index}
          src={process.env.PUBLIC_URL + `/weather/lightning/${image}`}
          alt={`lightning${index + 1}`}
          style={{
            opacity: current === index ? 1 : 0,
            animationDelay: `${index * 1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Lightning;
