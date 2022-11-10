import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export const Forecast = ({ forecastProps }) => {
  const navigate = useNavigate();

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
    if (!forecastProps.state) {
      navigate("/assessment/objects", { replace: true });
    } else {
      ymaps.ready(init);
    }

    return () => {
      myMap?.destroy();
    };
  }, []);

  const ForecastForm = ({ flatsData }) => {
    return (
      <Form
        colon={false}
        className={classes.forecast_form}
        name="forecast_form"
        labelAlign="left"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item name="date" label="Дата оценки">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
        </Form.Item>

        <Form.Item name="subject" label="Субъект РФ">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
        </Form.Item>

        <Form.Item name="AO" label="Административный округ">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
        </Form.Item>

        <Form.Item name="street" label="Улица">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
        </Form.Item>

        <Form.Item name="num" label="Hoмер дома">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
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

        <Form.Item name="condition" label="Состояние">
          <Typography.Text>
            {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
          </Typography.Text>
        </Form.Item>
      </Form>
    );
  };

  return (
    <div className={classes.container}>
      <ForecastForm flatsData={forecastProps.data} />
      <div className={classes.wrap}>
        <Typography.Title className={classes.title} level={5}>
          Прогнозная стоимость объекта оценки по состоянию на:{" "}
          {moment().format("DD MM YYYY")}
          {"* "}
          <p>65 000 000 ({numberInWords(65_000_000)}) рублей</p>
        </Typography.Title>
        <Typography.Text className={classes.title}>
          Прогнозная стоимость 1 м.кв.{" "}
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
