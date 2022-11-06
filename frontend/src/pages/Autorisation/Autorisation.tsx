import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AutorisationForm } from "components";
import { Typography } from "antd";
import { AuthContext } from "../../router/AuthProvider";

const { Title, Text } = Typography;
import classes from "./Autorisation.module.scss";
import { Link } from "react-router-dom";

const Autorisation = () => {
  const { onLogin } = useContext(AuthContext);
  const [errorMessege, setErrorMessege] = useState(false);
  const navigate = useNavigate();

  function onSubmitSuccess(value) {
    setErrorMessege(false);
    onLogin(value.login, value.password).then((status) => {
      if (status === 200) {
        navigate("/market");
      } else {
        setErrorMessege(true);
      }
    });
  }

  return (
    <div className={classes.autorisation_container}>
      <div className={classes.autorisation_form}>
        <Title level={3} className={classes.title}>
          Авторизация
        </Title>
        <AutorisationForm onFinish={onSubmitSuccess} />
        <Text type="danger" className={classes.err_text}>
          {errorMessege ? "Неправильный Email или Пароль" : " "}
        </Text>
      </div>
      <Link className={classes.registiration_link} to="/registration">
        Регистрация
      </Link>
    </div>
  );
};

export default Autorisation;
