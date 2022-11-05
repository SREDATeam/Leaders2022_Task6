import { useState } from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";

import classes from "./Task.module.scss";

export const Task = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  const fields = [
    { name: "date", value: moment() },
    { name: "subject", value: "Москва" },
  ];

  return (
    <div className={classes.container}>
      <Form
        className={classes.task_form}
        name="task_form"
        fields={fields}
        labelAlign="left"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={() => {
          navigate("bilding");
        }}
      >
        <Form.Item
          name="date"
          label="Дата оценки"
          rules={[{ required: true, message: "Дата обязятельна" }]}
        >
          <DatePicker className={classes.date_piker} format={"DD.MM.YYYY"} />
        </Form.Item>

        <Form.Item
          name="subject"
          label="Субъект РФ"
          rules={[{ required: true, message: "Субъект обязателен" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="AO"
          label="Административный округ"
          rules={[{ required: true, message: "Округ обязятелен" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="street"
          label="Улица"
          rules={[{ required: true, message: "Улица обязятельна" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="num"
          label="Hoмер дома"
          rules={[{ required: true, message: "Номер обязятелен" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="part" label="Сегмент">
          <Input />
        </Form.Item>

        <Form.Item name="year" label="Год постройки">
          <Input />
        </Form.Item>

        <Form.Item name="material" label="Материал наружных стен">
          <Input />
        </Form.Item>

        <Form.Item name="floors" label="Количество этажей">
          <Input />
        </Form.Item>

        <Form.Item name="renovation" label="Программа 'Реновация'">
          <Input />
        </Form.Item>

        <Form.Item name="metro" label="Удаленность от метро">
          <Input />
        </Form.Item>

        <Form.Item className={classes.btns} wrapperCol={{ span: 24 }}>
          <Button type="default">
            <Link to="/assessment">Вернуться</Link>
          </Button>

          <Button type="primary" className={classes.sub_btn}>
            Загрузить
          </Button>

          <Button type="primary" htmlType="submit" className={classes.sub_btn}>
            Продолжить
          </Button>
        </Form.Item>
      </Form>
      <Modal open={modalShow}>Загрузить пул объектов</Modal>
    </div>
  );
};
