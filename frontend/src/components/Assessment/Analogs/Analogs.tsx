import { Button, Form, Select, Input, Typography, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  segInetify,
  roomsInetify,
  balcInetify,
} from "../../../utils/indentify";

import classes from "./Analogs.module.scss";
import { calcLoad } from "api/floors";

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
  index,
  position,
  flatsData,
  reload,
  setRepair,
}: {
  index: number;
  position: number;
  flatsData: any;
  reload: (num: number, position: number) => void;
  setRepair: (num: number, repair: number) => void;
}) => {
  const link = ` https://www.cian.ru/sale/flat/${
    flatsData?.idk.split("ci-")[1]
  }/`;

  return (
    <Form
      className={classes.analog_form}
      name="analog_form"
      fields={[{ name: "repair", value: flatsData?.repair }]}
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title className={classes.header_of_form} level={5}>
          Аналог № {index + 1}
        </Typography.Title>
      </Form.Item>

      <Form.Item name="address">
        <Popover content={flatsData?.address || "Нет данных"} trigger="click">
          <Button size="small" type="link">
            Смотреть
          </Button>
        </Popover>
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

      <Form.Item name="repair">
        <Select
          onChange={(e) => {
            setRepair(index, e);
          }}
        >
          <Select.Option value={1}>Без отделки</Select.Option>
          <Select.Option value={2}>Муниципальный ремонт</Select.Option>
          <Select.Option value={3}>Современная отделка</Select.Option>
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

      <Form.Item name="link">
        {flatsData?.idk ? (
          <Typography.Link href={link}>На Циан</Typography.Link>
        ) : (
          <Typography.Text>Нет данных</Typography.Text>
        )}
      </Form.Item>

      <Form.Item className={classes.control_btns}>
        <Button
          className={classes.control_btn}
          type="default"
          onClick={() => {
            reload(index, position);
          }}
        >
          Заменить
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Analogs = ({
  setFloors,
  floorsProps,
  setCalculation,
  setPool,
}: {
  setFloors: any;
  floorsProps: any;
  setCalculation: any;
  setPool: any;
}) => {
  const navigate = useNavigate();

  const [choosenAnalogs, setChoosenAnalogs] = useState(
    floorsProps.state &&
      Object.keys(floorsProps?.data).map((referense) => {
        const chosen: number[] = [];
        const queue: number[] = [];
        Object.keys(floorsProps.data[referense].analogs).forEach((_, index) => {
          index < 5 ? chosen.push(index) : queue.push(index);
        });
        return { chosen, queue };
      }),
  );

  const [roomsNum, setRoomsNum] = useState(0);

  useEffect(() => {
    if (!floorsProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

  const chageRepair = (num: number, repair: number) => {
    const newFloorsData = [...floorsProps.data];

    newFloorsData[roomsNum].analogs[num].repair = repair;

    setFloors(newFloorsData);

    sessionStorage.setItem("floorsDataList", JSON.stringify(floorsProps.data));
  };

  const chageChosenAnalogs = (num: number, position: number) => {
    const newChoosenAnalogs = { ...choosenAnalogs };
    const newAnalog = newChoosenAnalogs[roomsNum].queue.shift();

    newChoosenAnalogs[roomsNum].chosen[position] = newAnalog;
    newChoosenAnalogs[roomsNum].queue.push(num);

    setChoosenAnalogs(newChoosenAnalogs);
  };

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
            {floorsProps.data &&
              floorsProps.data.map((data, index) => {
                return (
                  <Select.Option key={index} value={"" + index}>
                    {`${roomsInetify(data.rooms)} | Адрес: ${data.address}`}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className={classes.analogs_wrap}>
        <AnalogFormTitles />
        <div className={classes.analogs_row}>
          {choosenAnalogs[roomsNum]?.chosen.map(
            (chosenNum: number, index: number) => {
              return (
                <AnalogForm
                  index={chosenNum}
                  position={index}
                  flatsData={floorsProps.data[roomsNum].analogs[chosenNum]}
                  key={chosenNum}
                  setRepair={chageRepair}
                  reload={chageChosenAnalogs}
                />
              );
            },
          )}
        </div>
      </div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/bilding");
          }}
        >
          Вернуться
        </Button>
        <div className={classes.attantion}>
          *Будут отосланны аналоги к каждому эталону{" "}
          <Button
            type="primary"
            onClick={() => {
              const sendEetalons = {};
              const sendAnalogs = {};
              floorsProps?.data.forEach((referense, etalonIndex) => {
                const { analogs, ...newEtalon } = referense;
                sendEetalons[etalonIndex] = [newEtalon];
                sendAnalogs[etalonIndex] = [];
                analogs.forEach((analog, index) => {
                  if (choosenAnalogs[etalonIndex].chosen.includes(index))
                    sendAnalogs[etalonIndex].push(analog);
                });
              });
              calcLoad({ etalon: sendEetalons, analogs: sendAnalogs })
                .then((response) => {
                  console.log(response.data);
                  const calcedData = response.data.ranked_etalons.map(
                    (etalon, index) => {
                      const newEtalon = { ...etalon };
                      newEtalon.analogs = response.data.analogs[index];
                      return newEtalon;
                    },
                  );
                  setCalculation.data(calcedData);
                  sessionStorage.setItem(
                    "calculationDataList",
                    JSON.stringify(calcedData),
                  );
                  setPool(response.data.pool);
                  sessionStorage.setItem(
                    "poolDataList",
                    JSON.stringify(response.data.pool),
                  );
                  setCalculation.state(true);
                  navigate("/assessment/calculation");
                })
                .catch((err) => {
                  console.error(err);
                });
            }}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};
