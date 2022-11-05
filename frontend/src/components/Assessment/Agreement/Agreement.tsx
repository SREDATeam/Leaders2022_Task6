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

const AgreementForm = ({ index }: { index: string }) => {
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
        <InputNumber />
      </Form.Item>

      <Form.Item name="rooms" label="Количество комнат">
        <InputNumber />
      </Form.Item>

      <Form.Item name="total_area" label="Площадь общая">
        <InputNumber />
      </Form.Item>

      <Form.Item name="living_area" label="Площадь жилая">
        <InputNumber />
      </Form.Item>

      <Form.Item name="kitchen_area" label="Площадь кухни">
        <InputNumber />
      </Form.Item>

      <Form.Item name="balcony" label="Лоджия/Балкон" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item name="condition" label="Сострояние">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>

      <Typography.Text>Рыночная стоимость</Typography.Text>
      <Form.Item name="market_prise" wrapperCol={{ span: 24 }}>
        <Input />
      </Form.Item>

      <Typography.Text>Рыночная стоимость за кв.м.</Typography.Text>
      <Form.Item name="market_metr_prise" wrapperCol={{ span: 24 }}>
        <Input />
      </Form.Item>
    </Form>
  );
};

export const Agreement = () => {
  return (
    <div className={classes.container}>
      <div className={classes.agreement_row}>
        <AgreementForm index="1" />
        <AgreementForm index="2" />
        <AgreementForm index="3" />
        <AgreementForm index="4" />
      </div>
      <div className={classes.btns}>
        <Button>Вернуться</Button>
        <Button type="primary">Продолжить</Button>
      </div>
    </div>
  );
};
