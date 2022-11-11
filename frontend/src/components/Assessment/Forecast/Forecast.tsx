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
import {
  segInetify,
  remInetify,
  roomsInetify,
  balcInetify,
  wallInetify,
} from "../../../utils/indentify";
import { numParser, rubParser } from "utils/parsers";
import { secureRound } from "../../../utils/rounding";

import classes from "./Forecast.module.scss";
import { Indexes } from "components/Indexes/Indexes";

const getPrisePerMetr = (price, metrs) => {
  return numParser(secureRound(price / metrs, 0));
};

const ForecastForm = ({ data }) => {
  return (
    <Form
      colon={false}
      size="small"
      className={classes.forecast_form}
      name="forecast_form"
      labelAlign="left"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item name="date" label="Дата оценки">
        <Typography.Text>{moment().format("DD.MM.YYYY")}</Typography.Text>
      </Form.Item>

      <Form.Item name="address" label="Адрес">
        <Typography.Text>{data?.address || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item name="floor" label="Этаж">
        <Typography.Text>{data?.floor || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item name="seg" label="Сегмент">
        <Typography.Text>{segInetify(data?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="rooms" label="Количество комнат">
        <Typography.Text>{roomsInetify(data?.rooms)}</Typography.Text>
      </Form.Item>

      <Form.Item name="mat" label="Материал стен">
        <Typography.Text>{wallInetify(data?.mat)}</Typography.Text>
      </Form.Item>

      <Form.Item name="area" label="Площадь общая">
        <Typography.Text>
          {data?.area + " м.кв." || "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="area_kitchen" label="Площадь кухни">
        <Typography.Text>
          {data?.area_kitchen + " м.кв." || "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk" label="Лоджия/Балкон">
        <Typography.Text>{balcInetify(data?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="repair" label="Состояние">
        <Typography.Text>{remInetify(data?.repair)}</Typography.Text>
      </Form.Item>

      <Form.Item name="per_meter" label="Рыночная стоймость">
        <Typography.Text>
          {numParser(secureRound(data?.price, 0))}
          {`\u20bd`}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="per_meter" label="Рыночная стоймость за м.кв.">
        <Typography.Text>
          {numParser(secureRound(data?.per_meter, 0))}
          {`\u20bd`}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

export const Forecast = ({ forecastProps }) => {
  const navigate = useNavigate();

  let myMap = null;

  function init() {
    myMap = new ymaps.Map(
      "map",
      {
        center: [55.63, 37.45],
        zoom: 10,
        controls: ["fullscreenControl", "zoomControl"],
      },
      {
        yandexMapDisablePoiInteractivity: true,
      },
    );

    const house = new ymaps.GeoObjectCollection();

    if (forecastProps.state) {
      const coords = [forecastProps.data.lat, forecastProps.data.lng];
      house.add(
        new ymaps.Placemark(
          coords,
          {},
          {
            preset: "islands#icon",
            iconColor: "#0095b6",
          },
        ),
      );
      myMap.geoObjects.add(house);
      myMap.setCenter(coords, 16);
    }
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

  return (
    <div className={classes.container}>
      <ForecastForm data={forecastProps.data} />
      <div className={classes.wrap}>
        <Typography.Title className={classes.title} level={5}>
          Прогнозная стоимость объекта оценки по состоянию на:{" "}
          {moment().add(3, "M").format("DD MM YYYY")}
          {"* "}
          <p>
            {numParser(forecastProps.data.forecast)} (
            {numberInWords(forecastProps.data.forecast)}) рублей
          </p>
        </Typography.Title>
        <Typography.Text className={classes.title}>
          Прогнозная стоимость 1 м.кв.{" "}
          <p>
            {getPrisePerMetr(
              forecastProps.data.forecast,
              forecastProps.data.area,
            )}{" "}
            (
            {numberInWords(
              getPrisePerMetr(
                forecastProps.data.forecast,
                forecastProps.data.area,
              ),
            )}
            ) рублей
          </p>
        </Typography.Text>
        <div id="map" className={classes.map}>
          <div className={classes.index_wrap}>{/* <Indexes /> */}</div>
        </div>
        <Typography.Text className={classes.footnote}>
          *Прогноз изменения стоймости объекта оценки носит справочный характер.
          <p>Не является инвестиционной рекомендацией.</p>
        </Typography.Text>
      </div>
    </div>
  );
};
