import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RegistrationForm } from "components";
import { Link } from "react-router-dom";
import { AuthContext } from "../../router/AuthProvider";
import { registerUser } from "api/user";

import { Typography } from "antd";
const { Title, Text } = Typography;
import classes from "./Registration.module.scss";

const Registration = () => {
  const { token } = useContext(AuthContext);
  const [errorMessege, setErrorMessege] = useState(false);
  const [alertMessege, setAlertMessege] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/market");
    }
  }, []);

  function onSubmitSuccess(formData) {
    setErrorMessege(false);
    setAlertMessege(false);
    registerUser(formData)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
        err.response.data.message == "User already exists"
          ? setAlertMessege(true)
          : setErrorMessege(true);
      });
  }

  return (
    <div className={classes.registration_container}>
      <div className={classes.registration_form}>
        <Title level={3} className={classes.title}>
          Регистрация пользователя
        </Title>
        <RegistrationForm onFinish={onSubmitSuccess} />
        <Text type="danger" className={classes.err_text}>
          {errorMessege ? "Ошибка на сервере, попробуйте еще раз" : " "}
          {alertMessege ? "Такой пользователь уже зарегистрирован" : " "}
        </Text>
      </div>
      <Link className={classes.autorisation_link} to="/">
        Авторизоваться
      </Link>
    </div>
  );
};

export default Registration;
