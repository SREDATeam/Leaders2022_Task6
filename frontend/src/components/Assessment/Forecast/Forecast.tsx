import { useEffect } from "react";
import {
  Button,
  Switch,
  Form,
  Select,
  InputNumber,
  Input,
  Typography,
  DatePicker,
} from "antd";
import moment from "moment";
import numberInWords from "utils/numInWords";

import classes from "./Forecast.module.scss";
import { Indexes } from "components/Indexes/Indexes";

export const Forecast = () => {
  let myMap = null;
  function init() {
    myMap = new ymaps.Map(
      "map",
      {
        center: [55.63, 37.45],
        zoom: 10,
        controls: ["fullscreenControl"],
      },
      {
        yandexMapDisablePoiInteractivity: true,
      },
    );
  }

  useEffect(() => {
    ymaps.ready(init);

    return () => {
      myMap.destroy();
    };
  }, []);

  return (
    <div className={classes.container}>
      <Form
        className={classes.forecast_form}
        name="forecast_form"
        // fields={fields}
        labelAlign="left"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
        onFinish={() => {
          // navigate("bilding");
        }}
      >
        <Form.Item name="date" label="Дата оценки">
          <DatePicker className={classes.date_piker} format={"DD/MM/YYYY"} />
        </Form.Item>

        <Form.Item name="subject" label="Субъект РФ">
          <Input />
        </Form.Item>

        <Form.Item name="AO" label="Административный округ">
          <Input />
        </Form.Item>

        <Form.Item name="street" label="Улица">
          <Input />
        </Form.Item>

        <Form.Item name="num" label="Hoмер дома">
          <Input />
        </Form.Item>

        <Form.Item name="floor" label="Этаж">
          <InputNumber className={classes.input_num} />
        </Form.Item>

        <Form.Item name="rooms" label="Количество комнат">
          <InputNumber className={classes.input_num} />
        </Form.Item>

        <Form.Item name="total_area" label="Площадь общая">
          <InputNumber className={classes.input_num} />
        </Form.Item>

        <Form.Item name="living_area" label="Площадь жилая">
          <InputNumber className={classes.input_num} />
        </Form.Item>

        <Form.Item name="kitchen_area" label="Площадь кухни">
          <InputNumber className={classes.input_num} />
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
      </Form>
      <div className={classes.wrap}>
        <Typography.Title className={classes.title} level={5}>
          Прогнозная стоймость объекта оценки по состоянию на:{" "}
          {moment().format("DD MM YYYY")}
          {"* "}
          <p>65 000 000 ({numberInWords(65_000_000)}) рублей</p>
        </Typography.Title>
        <Typography.Text className={classes.title}>
          Прогнозная стоймость 1 м.кв.{" "}
          <p>650 000 ({numberInWords(650_000)}) рублей</p>
        </Typography.Text>
        <div id="map" className={classes.map}>
          <div className={classes.index_wrap}>
            <Indexes />
          </div>
        </div>
        <Typography.Text className={classes.footnote}>
          *Прогноз изменения стоймости объекта оценки носит справочный характер.
          <p>Не является инвестиционной рекомендацией.</p>
        </Typography.Text>
      </div>
    </div>
  );
};
