import { Button, Form, Popover, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  wallInetify,
  segInetify,
  remInetify,
  roomsInetify,
  balcInetify,
} from "../../../utils/indentify";

import classes from "./Bilding.module.scss";

interface FieldData {
  name: string;
  value: any;
}

const BildingForm = ({ index, data }: { index: string; data: any }) => {
  return (
    <Form
      colon={false}
      className={classes.bilding_form}
      name="bilding_form"
      labelAlign="left"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10, offset: 4 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title level={5}>Эталон № {index + 1}</Typography.Title>
      </Form.Item>

      <Form.Item name="address" label="Адрес">
        <Popover content={data?.address || "Нет данных"} trigger="click">
          <Button size="small" type="link">
            Смотреть
          </Button>
        </Popover>
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
    </Form>
  );
};

export const Bilding = ({ floorsProps }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!floorsProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.bildings_row}>
        {floorsProps.data &&
          floorsProps.data.map((data, index) => {
            return <BildingForm index={index} data={data} key={index} />;
          })}
      </div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/objects");
          }}
        >
          Вернуться
        </Button>
        <Button
          type="primary"
          onClick={() => {
            if (floorsProps.state) {
              navigate("/assessment/analogs");
            }
          }}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
