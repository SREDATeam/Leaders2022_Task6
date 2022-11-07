import { Button, Form, Select, Input, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import classes from "./Analogs.module.scss";

interface FieldData {
  name: string;
  value: any;
}

function segInetify(val) {
  switch (val) {
    case 1:
      return "Новостройка";
    case 2:
      return "Современное жилье";
    case 3:
      return "Старый жилой фонд";
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

const AnalogFormTitles = () => {
  const [addressHeight, setAdderssHeight] = useState();
  useEffect(() => {
    setAdderssHeight(window.address0?.offsetHeight);
  }, []);

  return (
    <Form
      className={classes.analog_titles}
      name="analog_titles"
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item style={{ height: addressHeight }}>
        <Typography.Title className={classes.header_of_titles} level={5}>
          Местоположение
        </Typography.Title>
      </Form.Item>

      <Form.Item>
        <Typography.Text>Адрес</Typography.Text>
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
        <Typography.Text>Ссылка на циан id</Typography.Text>
      </Form.Item>
    </Form>
  );
};

const AnalogForm = ({
  fields,
  index,
  flatsData,
  reload,
}: {
  fields: FieldData[];
  index: string;
  flatsData: any;
  reload: (num: string) => void;
}) => {
  return (
    <Form
      className={classes.analog_form}
      name="analog_form"
      fields={fields}
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title className={classes.header_of_form} level={5}>
          Аналог: {index}
        </Typography.Title>
      </Form.Item>

      <Form.Item name="address">
        <Typography.Text id={"address" + index}>
          {flatsData?.address || "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="metro">
        <Typography.Text>
          {flatsData?.metro ? flatsData.metro + " мин" : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="seg">
        <Typography.Text>{segInetify(flatsData?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="floors">
        <Typography.Text>
          {flatsData?.floors ? flatsData.floors : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Typography.Text>
          {flatsData?.floor ? flatsData.floor : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="rooms">
        <Typography.Text>{roomsInetify(flatsData?.rooms)}</Typography.Text>
      </Form.Item>

      <Form.Item name="area">
        <Typography.Text>
          {flatsData?.area ? flatsData.area + " м.кв" : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="area_live">
        <Typography.Text>
          {flatsData?.area_live ? flatsData.area_live + " м.кв" : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="area_kitchen">
        <Typography.Text>
          {flatsData?.area_kitchen
            ? flatsData.area_kitchen + " м.кв"
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk">
        <Typography.Text>{balcInetify(flatsData?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="condition">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="new_price">
        <Typography.Text>
          {flatsData?.price ? flatsData.price + " руб." : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="new_per_meter">
        <Typography.Text>
          {flatsData?.per_meter ? flatsData.per_meter + " руб." : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="idk">
        <Typography.Text>
          {flatsData?.idk ? flatsData.idk : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item className={classes.control_btns}>
        <Button
          type="default"
          onClick={() => {
            reload(index);
          }}
        >
          Заменить
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Analogs = ({
  floorsProps,
  setCalculation,
}: {
  floorsProps: any;
  setCalculation: any;
}) => {
  const navigate = useNavigate();

  const [choosenAnalogs, setChoosenAnalogs] = useState(
    floorsProps.state &&
      Object.keys(floorsProps?.data).map((referense) => {
        return Object.keys(floorsProps.data[referense].analogs).reduce(
          (reduser, index) => {
            +index < 5 ? (reduser[index] = true) : (reduser[index] = false);
            return reduser;
          },
          {},
        );
      }),
  );

  const [roomsNum, setRoomsNum] = useState(0);

  useEffect(() => {
    if (!floorsProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

  const chage = (num) => {
    const newChoosenAnalogs = { ...choosenAnalogs };
    let count = num;
    let max = Object.keys(newChoosenAnalogs[roomsNum]).length;
    while (newChoosenAnalogs[roomsNum][num]) {
      count++;
      if ((max = count)) {
        break;
      }
      if (!newChoosenAnalogs[roomsNum][count]) {
        newChoosenAnalogs[roomsNum][count] = true;
        newChoosenAnalogs[roomsNum][num] = false;
        break;
      }
    }
    console.log(newChoosenAnalogs);

    setChoosenAnalogs(newChoosenAnalogs);
  };

  const fields: FieldData[] = [{ name: "condition", value: "none" }];

  return (
    <div className={classes.container}>
      <div className={classes.select_row}>
        <div className={classes.select_wrap}>
          <Typography.Title level={4}>
            Аналоги для эталонного объекта:
          </Typography.Title>
          <Select
            className={classes.referense_select}
            defaultValue="0"
            onChange={(e) => {
              setRoomsNum(e);
            }}
          >
            {floorsProps.state &&
              floorsProps?.data.map((data, index) => {
                return (
                  <Select.Option key={index} value={"" + index}>
                    {`${roomsInetify(data.rooms)} | Адрес: ${data.address}`}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className={classes.analogs_row}>
        <AnalogFormTitles />
        {floorsProps.state &&
          floorsProps?.data[roomsNum].analogs.map((data, index) => {
            return (
              choosenAnalogs[roomsNum][index] && (
                <AnalogForm
                  index={index}
                  fields={fields}
                  flatsData={data}
                  key={index}
                  reload={chage}
                />
              )
            );
          })}
      </div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/bilding");
          }}
        >
          Вернуться
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setCalculation.state(true);
            navigate("/assessment/calculation");
          }}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
