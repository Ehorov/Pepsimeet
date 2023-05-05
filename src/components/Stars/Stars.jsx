import s from "./Stars.module.css";

const Stars = () => {
  const stars = [];

  for (let i = 0; i < 500; i++) {
    stars.push(
      <div
        className={s.star}
        key={i}
        style={{
          left: Math.random() * 100 + "%",
          top: Math.random() * 100 + "%",
        }}
      ></div>
    );
  }

  return <div id="stars-container">{stars}</div>;
};

export default Stars;
