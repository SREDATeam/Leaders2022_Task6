import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

import classes from "./AutorisationForm.module.scss";

interface AutorisationFormProps {
  onFinish?: (values: any) => void;
}

export const AutorisationForm: React.FC<AutorisationFormProps> = ({
  onFinish,
}) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed");
  };

  return (
    <Form
      name="autorisation"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
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
        rules={[{ required: true, message: "Введите пароль" }]}
      >
        <Input.Password
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          placeholder="Пароль"
        />
      </Form.Item>

      <Button type="primary" htmlType="submit" className={classes.sub_btn}>
        Вход
      </Button>
    </Form>
  );
};
