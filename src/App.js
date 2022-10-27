import s from "./app.module.css";

import { Helmet } from "react-helmet";

const App = () => {
  return (
    <div className={s.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pepsi meet</title>
        <link rel="canonical" href="https://pepsi-meet.vercel.app/" />
        <meta name="description" content="Map" />
      </Helmet>
      <img src="background.svg" alt="Pepsi" className={s.background_img} />
      <button type="button">
        <img src="/pepsi_logo.svg" alt="btn_open" className={s.btn_logo} />
      </button>
    </div>
  );
};

export default App;
