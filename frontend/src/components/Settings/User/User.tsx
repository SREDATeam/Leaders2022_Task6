import { Button, Form, Input, Typography } from "antd";
import classes from "./User.module.scss";

export const User = () => {
  return (
    <div className={classes.container}>
      <Form
        className={classes.user_change_form}
        name="task_form"
        labelAlign="left"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item name="title" wrapperCol={{ span: 24 }}>
          <Typography.Title level={3} className={classes.title}>
            Изменение данных пользователя
          </Typography.Title>
        </Form.Item>
        <Form.Item name="subject" label="Фамилия">
          <Input />
        </Form.Item>

        <Form.Item name="AO" label="Имя">
          <Input />
        </Form.Item>

        <Form.Item name="street" label="Отчество">
          <Input />
        </Form.Item>

        <Form.Item name="num" label="Email">
          <Input />
        </Form.Item>

        <Form.Item name="part" label="Текущий пароль">
          <Input type="password" />
        </Form.Item>

        <Form.Item name="year" label="Новый пароль">
          <Input type="password" />
        </Form.Item>

        <Form.Item name="material" label="Подтверждение пароля">
          <Input type="password" />
        </Form.Item>

        <Form.Item className={classes.btns} wrapperCol={{ span: 24 }}>
          <Button type="default">Изменить</Button>

          <Button
            type="primary"
            htmlType="submit"
            className={classes.agree_btn}
          >
            Подтвердить изменения
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
