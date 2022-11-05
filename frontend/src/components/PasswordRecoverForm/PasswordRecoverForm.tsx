import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import clsx from "clsx";
import classes from "./PasswordRecoverForm.module.scss";

interface PasswordRecoverFormProps {
  className?: string;
  onFinish?: (values: any) => void;
}

export const PasswordRecoverForm: React.FC<PasswordRecoverFormProps> = ({
  className,
  onFinish,
}) => {
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={className}
      name="password_recover"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Пожалуйста введите Email!" }]}
      >
        <Input
          prefix={<MailOutlined className={classes.site_form_item_icon} />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={classes.sub_btn}>
          Запросить новый пароль
        </Button>
      </Form.Item>
    </Form>
  );
};
