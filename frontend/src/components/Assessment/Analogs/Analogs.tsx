import { Button, Form, Select, Input, Typography } from "antd";

import classes from "./Analogs.module.scss";

interface FieldData {
  name: string;
  value: any;
}

const AnalogFormTitles = () => {
  return (
    <Form
      className={classes.analog_titles}
      name="analog_titles"
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item>
        <Typography.Title className={classes.header_of_titles} level={5}>
          Местоположение
        </Typography.Title>
      </Form.Item>

      <Form.Item>
        <Typography.Text>Субъект РФ</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Город</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Административный округ</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Район</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Улица</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Номер дома</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Станция метро</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Расстояние до метро</Typography.Text>
      </Form.Item>

      <Form.Item>
        <Typography.Title className={classes.header_of_titles} level={5}>
          Здание
        </Typography.Title>
      </Form.Item>

      <Form.Item>
        <Typography.Text>Сегмент</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Год постройки</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Материал наружных стрен</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Количество этажей</Typography.Text>
      </Form.Item>

      <Form.Item>
        <Typography.Title className={classes.header_of_titles} level={5}>
          Объект
        </Typography.Title>
      </Form.Item>

      <Form.Item>
        <Typography.Text>Этаж</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Количество комнат</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Площадь общая</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Площадь жилая</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Площадь кухни</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Лоджия/Балкон</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Состояние</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Цена предложения</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Цена предложения за кв.м.</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Ссылка на источник</Typography.Text>
      </Form.Item>
    </Form>
  );
};

const AnalogForm = ({
  fields,
  index,
}: {
  fields: FieldData[];
  index: string;
}) => {
  return (
    <Form
      className={classes.analog_form}
      name="analog_form"
      fields={fields}
      labelAlign="left"
      wrapperCol={{ span: 24 }}
      onFinish={() => {
        // navigate("bilding");
      }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title className={classes.header_of_form} level={5}>
          Аналог: {index}
        </Typography.Title>
      </Form.Item>

      <Form.Item name="subject">
        <Input />
      </Form.Item>

      <Form.Item name="city">
        <Input />
      </Form.Item>

      <Form.Item name="AO">
        <Input />
      </Form.Item>

      <Form.Item name="district">
        <Input />
      </Form.Item>

      <Form.Item name="street">
        <Input />
      </Form.Item>

      <Form.Item name="house_num">
        <Input />
      </Form.Item>

      <Form.Item name="metro_station">
        <Input />
      </Form.Item>

      <Form.Item name="time_to_station">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="segment">
        <Input />
      </Form.Item>

      <Form.Item name="constraction_year">
        <Input />
      </Form.Item>

      <Form.Item name="wall_material">
        <Input />
      </Form.Item>

      <Form.Item name="floor_num">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Input />
      </Form.Item>

      <Form.Item name="rooms_num">
        <Input />
      </Form.Item>

      <Form.Item name="total_area">
        <Input />
      </Form.Item>

      <Form.Item name="living_area">
        <Input />
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Input />
      </Form.Item>

      <Form.Item name="balcony">
        <Input />
      </Form.Item>

      <Form.Item name="condition">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="offer_prise">
        <Input />
      </Form.Item>

      <Form.Item name="metr_prise">
        <Input />
      </Form.Item>

      <Form.Item name="sourse">
        <Input />
      </Form.Item>

      <Form.Item className={classes.control_btns}>
        <Button type="default">Заменить</Button>
        <Button type="primary" htmlType="submit" className={classes.assept_btn}>
          Принять
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Analogs = () => {
  const fields: FieldData[] = [{ name: "condition", value: "none" }];

  return (
    <div className={classes.container}>
      <div className={classes.analogs_row}>
        <AnalogFormTitles />
        <AnalogForm fields={fields} index="1" />
        <AnalogForm fields={fields} index="2" />
        <AnalogForm fields={fields} index="3" />
        <AnalogForm fields={fields} index="4" />
      </div>
      <div className={classes.btns}>
        <Button>Вернуться</Button>
        <Button type="primary">Продолжить</Button>
      </div>
    </div>
  );
};
