import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import classes from "./User.module.scss";

const values = [
  { name: "Фамилия", value: "Админов" },
  { name: "Имя", value: "Админ" },
  { name: "Отчество", value: "Админович" },
  { name: "Email", value: "admin@mail.com" },
];

export const User = () => {
  const [disabledInputs, setDisabledInputs] = useState(true);

  return (
    <div className={classes.container}>
      <Form
        className={classes.user_change_form}
        fields={values}
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
        <Form.Item name="Фамилия" label="Фамилия">
          <Input disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="Имя" label="Имя">
          <Input disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="Отчество" label="Отчество">
          <Input disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="Email" label="Email">
          <Input disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="password_old" label="Текущий пароль">
          <Input type="password" disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="password_new" label="Новый пароль">
          <Input type="password" disabled={disabledInputs} />
        </Form.Item>

        <Form.Item name="password_new_check" label="Подтверждение пароля">
          <Input type="password" disabled={disabledInputs} />
        </Form.Item>

        <Form.Item className={classes.btns} wrapperCol={{ span: 24 }}>
          {disabledInputs ? (
            <Button
              type="default"
              onClick={() => {
                setDisabledInputs(false);
              }}
            >
              Изменить
            </Button>
          ) : (
            <Button
              type="default"
              onClick={() => {
                setDisabledInputs(true);
              }}
            >
              Отменить
            </Button>
          )}

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
