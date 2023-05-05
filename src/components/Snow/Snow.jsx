import s from "./Snow.module.css";

const Snow = () => {
  const flakes = [];

  for (let i = 0; i < 500; i++) {
    flakes.push(
      <div
        className={s.snow}
        key={i}
        style={{
          left: Math.random() * 100 + "%",
          animationDelay: Math.random() * 5 + "s",
          animationDuration: Math.random() * 5 + 5 + "s",
        }}
      ></div>
    );
  }

  return <div id="snow-container">{flakes}</div>;
};

export default Snow;
