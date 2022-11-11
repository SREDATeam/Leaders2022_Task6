import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";

const { Title } = Typography;

import classes from "./RegistrationForm.module.scss";

interface RegistrationFormProps {
  onFinish?: (values: any) => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onFinish,
}) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="registration"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item noStyle>
        <Title level={5} className={classes.title}>
          ФИО для добавления исполнителя в Отчет
        </Title>
      </Form.Item>

      <Form.Item
        name="first_name"
        rules={[
          { required: true, message: "Введите имя" },
          { type: "string", min: 2, message: "Минимум два символа" },
        ]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Имя"
        />
      </Form.Item>

      <Form.Item
        name="last_name"
        rules={[
          { required: true, message: "Введите фамилию" },
          { type: "string", min: 2, message: "Минимум два символа" },
        ]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Фамилия"
        />
      </Form.Item>

      <Form.Item name="patronymic">
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Отчество"
        />
      </Form.Item>

      <Form.Item noStyle>
        <Title level={5} className={classes.title}>
          Email и Пароль для входа в систему
        </Title>
      </Form.Item>

      <Form.Item
        name="login"
        rules={[
          { required: true, message: "Введите email" },
          { type: "email", message: "Не корректный email" },
        ]}
      >
        <Input
          prefix={<MailOutlined className={classes.site_form_item_icon} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Пожалуйста введите Пароль!" },
          { type: "string", min: 6, message: "Минимум шесть символов" },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item
        name="confitm_password"
        rules={[
          {
            required: true,
            message: "Поддвердите пароль",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Пароли не совпадают"));
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          placeholder="Подтвердите пароль"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" className={classes.sub_btn}>
        Зарегистрироваться
      </Button>
    </Form>
  );
};
