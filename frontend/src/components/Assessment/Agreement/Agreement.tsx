import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Button,
  Switch,
  Form,
  Select,
  InputNumber,
  Input,
  Typography,
} from "antd";

import classes from "./Agreement.module.scss";

const AgreementForm = ({
  index,
  flatsData,
}: {
  index: string;
  flatsData: any;
}) => {
  return (
    <Form
      className={classes.agreement_form}
      name="agreement_form"
      labelAlign="left"
      labelCol={{ span: 14 }}
      wrapperCol={{ span: 10 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title level={5}>Объект номер: {index}</Typography.Title>
      </Form.Item>

      <Form.Item name="floor" label="Этаж">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="rooms" label="Количество комнат">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="total_area" label="Площадь общая">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="living_area" label="Площадь жилая">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area" label="Площадь кухни">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balcony" label="Лоджия/Балкон" valuePropName="checked">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="condition" label="Сострояние">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Typography.Text>Рыночная стоимость</Typography.Text>
      <Form.Item name="market_prise" wrapperCol={{ span: 24 }}>
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Typography.Text>Рыночная стоимость за кв.м.</Typography.Text>
      <Form.Item name="market_metr_prise" wrapperCol={{ span: 24 }}>
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

export const Agreement = ({ calculationProps }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!calculationProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);
  return (
    <div className={classes.container}>
      <div className={classes.agreement_row}>
        <AgreementForm index="1" flatsData />
        <AgreementForm index="2" flatsData />
        <AgreementForm index="3" flatsData />
        <AgreementForm index="4" flatsData />
      </div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/calculation");
          }}
        >
          Вернуться
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigate("/assessment/archive");
          }}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
