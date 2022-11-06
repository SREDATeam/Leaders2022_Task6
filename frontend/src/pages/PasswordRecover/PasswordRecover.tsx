import { useNavigate } from "react-router";
import { PasswordRecoverForm } from "components";
import { Typography } from "antd";

const { Title } = Typography;
import classes from "./PasswordRecover.module.scss";
import { Link } from "react-router-dom";

const PasswordRecover = () => {
  const navigate = useNavigate();

  function onSubmitSuccess() {
    navigate("/market");
  }

  return (
    <div className={classes.password_recover_container}>
      <div className={classes.password_recover_form}>
        <Title level={3} className={classes.title}>
          Восстановление пароля
        </Title>
        <PasswordRecoverForm
          className={classes.form}
          onFinish={onSubmitSuccess}
        />
      </div>
      <Link className={classes.autorisation_link} to="/">
        Вернуться к авторизации
      </Link>
    </div>
  );
};

export default PasswordRecover;
