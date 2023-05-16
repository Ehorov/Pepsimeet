import React from "react";

const Counter = (props) => {
  const temperature = Math.ceil(props.temperature);
  const interval = Math.ceil(props.interval / (1000 * 60 * 60));
  let result;
  if (temperature >= 0 && temperature < 10) {
    result = 2 * interval;
  } else if (temperature >= 10 && temperature < 20) {
    result = 3 * interval;
  } else if (temperature >= 20 && temperature < 30) {
    result = 4 * interval;
  } else if (temperature >= 30) {
    result = 5 * interval;
  } else {
    result = 1 * interval;
  }
  console.log(result);
  return <div>{result}</div>;
};

export default Counter;
