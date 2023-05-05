import s from "./Rain.module.css";

const Rain = () => {
  const drops = [];

  for (let i = 0; i < 500; i++) {
    drops.push(
      <div
        className={s.rain}
        key={i}
        style={{
          left: Math.random() * 100 + "%",
          animationDelay: Math.random() * 3 + "s",
        }}
      ></div>
    );
  }

  return <div id="rain-container">{drops}</div>;
};

export default Rain;
