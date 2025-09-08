import { useTranslation } from "react-i18next";
import "./App.css";

const App = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("welcome")}</h1>
    </>
  );
};

export default App;
