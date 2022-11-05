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
    console.log("Failed:", errorInfo);
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
        name="email"
        rules={[{ required: true, message: "Пожалуйста, введите Email!" }]}
      >
        <Input
          prefix={<MailOutlined className={classes.site_form_item_icon} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Пожалуйста, введите Пароль!" }]}
      >
        <Input
          prefix={<LockOutlined className={classes.site_form_item_icon} />}
          type="password"
          placeholder="Пароль"
        />
        <Link className={classes.pass_recover_link} to="/password-recover">
          Забыли пароль?
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={classes.sub_btn}>
          Вход
        </Button>
      </Form.Item>
    </Form>
  );
};
