import { useNavigate } from "react-router";
import { RegistrationForm } from "components";
import { Typography } from "antd";

const { Title } = Typography;
import classes from "./Registration.module.scss";
import { Link } from "react-router-dom";

export const Registration = () => {
  const navigate = useNavigate();

  function onSubmitSuccess() {
    navigate("/market");
  }

  return (
    <div className={classes.registration_container}>
      <div className={classes.registration_form}>
        <Title level={3} className={classes.title}>
          Регистрация пользователя
        </Title>
        <RegistrationForm onFinish={onSubmitSuccess} />
      </div>
      <Link className={classes.autorisation_link} to="/">
        Авторизоваться
      </Link>
    </div>
  );
};
