import { useNavigate } from "react-router";
import { AutorisationForm } from "components";
import { Typography } from "antd";

const { Title } = Typography;
import classes from "./Autorisation.module.scss";
import { Link } from "react-router-dom";

export const Autorisation = () => {
  const navigate = useNavigate();

  function onSubmitSuccess() {
    navigate("/market");
  }

  return (
    <div className={classes.autorisation_container}>
      <div className={classes.autorisation_form}>
        <Title level={3} className={classes.title}>
          Авторизация
        </Title>
        <AutorisationForm onFinish={onSubmitSuccess} />
      </div>
      <Link className={classes.registiration_link} to="/registration">
        Регистрация
      </Link>
    </div>
  );
};
