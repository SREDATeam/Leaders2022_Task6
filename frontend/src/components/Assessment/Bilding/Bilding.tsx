import { Button, Form, Select, Input, InputNumber, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import classes from "./Bilding.module.scss";

interface FieldData {
  name: string;
  value: any;
}

const BildingForm = ({ index, data }: { index: string; data: any }) => {
  return (
    <Form
      className={classes.bilding_form}
      name="bilding_form"
      labelAlign="left"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10, offset: 4 }}
      onFinish={() => {
        // navigate("bilding");
      }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title level={5}>Объект номер: {index}</Typography.Title>
      </Form.Item>

      <Form.Item name="floor" label="Этаж">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.floor : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="rooms" label="Количество комнат">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.rooms : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="total_area" label="Площадь общая">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.total_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="living_area" label="Площадь жилая">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.living_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area" label="Площадь кухни">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.kitchen_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balcony" label="Лоджия/Балкон">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.balcony : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="condition" label="Сострояние">
        <Typography.Text>
          {data ? data[+index - 1]?.reference.condition : "Нет данных"}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

export const Bilding = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.bildings_row}>
        <BildingForm index="1" data={data} />
        <BildingForm index="2" data={data} />
        <BildingForm index="3" data={data} />
        <BildingForm index="4" data={data} />
      </div>
      <div className={classes.btns}>
        <Button>Вернуться</Button>
        <Button type="primary">Продолжить</Button>
      </div>
    </div>
  );
};
