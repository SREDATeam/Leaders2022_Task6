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
        name="name"
        rules={[{ required: true, message: "Пожалуйста введите имя!" }]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Имя"
        />
      </Form.Item>

      <Form.Item
        name="secondname"
        rules={[{ required: true, message: "Пожалуйста введите фамилию!" }]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Фамилия"
        />
      </Form.Item>

      <Form.Item
        name="thirdname"
        rules={[{ required: true, message: "Пожалуйста введите Отчесво!" }]}
      >
        <Input
          prefix={<UserOutlined className={classes.site_form_item_icon} />}
          placeholder="Отчесво"
        />
      </Form.Item>

      <Form.Item noStyle>
        <Title level={5} className={classes.title}>
          Email и Пароль для входа в систему
        </Title>
      </Form.Item>

      <Form.Item
        name="email"
        rules={[{ required: true, message: "Пожалуйста введите Email!" }]}
      >
        <Input
          prefix={<MailOutlined className={classes.site_form_item_icon} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Пожалуйста введите Пароль!" }]}
      >
        <Input
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>

      <Form.Item
        name="werify password"
        rules={[
          {
            required: true,
            message: "Пожалуйста введите подтверждение Пароля!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          type="password"
          placeholder="Подтвердите пароль"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={classes.sub_btn}>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
