import { Button, Form, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import classes from "./Bilding.module.scss";

interface FieldData {
  name: string;
  value: any;
}

function segInetify(val) {
  switch (val) {
    case 0:
      return "Новостройка";
    case 1:
      return "Современное жилье";
    case 2:
      return "Старый жилой фонд";
    default:
      return "Нет данных";
  }
}

function wallInetify(val) {
  switch (val) {
    case 1:
      return "Кирпич";
    case 2:
      return "Панель";
    case 3:
      return "Монолит";
    default:
      return "Нет данных";
  }
}

function remInetify(val) {
  switch (val) {
    case 1:
      return "Без отделки";
    case 2:
      return "Муниципальный ремонт";
    case 3:
      return "Современная отделка";
    default:
      return "Нет данных";
  }
}
function balcInetify(val) {
  switch (val) {
    case 1:
      return "Есть балкон/лоджия";
    case 0:
      return "Нет балкона/лоджии";
    default:
      return "Нет данных";
  }
}

function roomsInetify(val) {
  switch (val) {
    case 0:
      return "Cтудия";
    case 1:
      return "Однушка";
    case 2:
      return "Двушка";
    case 3:
      return "Трешка";
    case 4:
      return "Многокомнатная";
    default:
      return "Нет данных";
  }
}

const BildingForm = ({ index, data }: { index: string; data: any }) => {
  return (
    <Form
      className={classes.bilding_form}
      name="bilding_form"
      labelAlign="left"
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 10, offset: 4 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title level={5}>Объект номер: {index}</Typography.Title>
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
        {floorsProps.data.map((data, index) => {
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
