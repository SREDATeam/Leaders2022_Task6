import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Form, Select, Typography, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  segInetify,
  remInetify,
  roomsInetify,
  balcInetify,
  wallInetify,
} from "../../../utils/indentify";

import classes from "./Calculation.module.scss";
import { secureRound } from "../../../utils/rounding";
import { rubParser } from "utils/parsers";
import { predict } from "api/floors";

const corrValues = (cost: number) => {
  let newCost = cost;
  return (persent: number) => {
    const delta = secureRound((newCost / 100) * persent, 0);
    return (
      <div>
        <Typography.Text
          style={{
            color: persent > 0 ? "green" : persent == 0 ? "black" : "red",
          }}
        >
          {persent}% | {delta}
          {`\u20bd`}
        </Typography.Text>
        <div>{rubParser((newCost += delta))}</div>
      </div>
    );
  };
};

const CalculationFormTitles = () => {
  return (
    <Form
      className={classes.calculation_titles}
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item>
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
        <Typography.Title className={classes.header_of_titles} level={5}>
          Расчет
        </Typography.Title>
      </Form.Item>

      <Form.Item>
        <Typography.Text>Корректировка на торг</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на площадь</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на удаленность от метро</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на этаж</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на площадь кухни</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>
          Корректировка на наличие балкона/лоджии
        </Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на состояние</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Сумма корректировок</Typography.Text>
        <div style={{ height: "1.5em" }}></div>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Вес аналога</Typography.Text>
      </Form.Item>
    </Form>
  );
};

const OriginalForm = ({ flatsData }: { flatsData: any }) => {
  return (
    <Form
      className={classes.calculation_form}
      name="calculation_form"
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title className={classes.header_of_form} level={5}>
          Эталон
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
        <Typography.Text>{flatsData?.metro || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="seg">
        <Typography.Text>{segInetify(flatsData?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="mat">
        <Typography.Text>{wallInetify(flatsData?.mat)}</Typography.Text>
      </Form.Item>

      <Form.Item name="floors">
        <Typography.Text>
          {flatsData?.floors ? flatsData.floors : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item>
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
          {flatsData?.area ?? "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {flatsData?.area_kitchen ?? "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk">
        <Typography.Text>{balcInetify(flatsData?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="repair">{remInetify(flatsData?.repair)}</Form.Item>
    </Form>
  );
};

const CorrectingForm = ({
  index,
  flatsData,
}: {
  index: number;
  flatsData: any;
}) => {
  const corrVal = corrValues(flatsData?.per_meter);
  return (
    <Form
      className={classes.calculation_form}
      name="analog_form"
      labelAlign="left"
      wrapperCol={{ span: 24 }}
    >
      <Form.Item wrapperCol={{ span: 24 }}>
        <Typography.Title className={classes.header_of_form} level={5}>
          Аналог: {index + 1}
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
        <Typography.Text>{flatsData?.metro || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="seg">
        <Typography.Text>{segInetify(flatsData?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="mat">
        <Typography.Text>{wallInetify(flatsData?.mat)}</Typography.Text>
      </Form.Item>

      <Form.Item name="floors">
        <Typography.Text>{flatsData?.floors || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Typography.Text>{flatsData?.floor || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item name="rooms">
        <Typography.Text>{roomsInetify(flatsData?.rooms)}</Typography.Text>
      </Form.Item>

      <Form.Item name="area">
        <Typography.Text>
          {flatsData?.area || "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {flatsData?.area_kitchen || "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk">
        <Typography.Text>{balcInetify(flatsData?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="repair">
        <Typography.Text>{remInetify(flatsData?.repair)}</Typography.Text>
      </Form.Item>

      <Form.Item name="price">
        <Typography.Text>
          {rubParser(secureRound(flatsData?.price, 0))}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="per_meter">
        <Typography.Text>
          {rubParser(secureRound(flatsData?.per_meter, 0))}
        </Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="main_corr">{corrVal(flatsData?.main_corr)}</Form.Item>

      <Form.Item name="area_coef">
        <Typography.Text>{corrVal(flatsData?.area_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="metro_coef">
        <Typography.Text>{corrVal(flatsData?.metro_coef)}</Typography.Text>
        <div style={{ height: "1.4em" }}></div>
      </Form.Item>

      <Form.Item name="floor_coef">
        <Typography.Text>{corrVal(flatsData?.floor_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="kit_coef">
        <Typography.Text>{corrVal(flatsData?.kit_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="balk_coef">
        <Typography.Text>{corrVal(flatsData?.balk_coef)}</Typography.Text>
        <div style={{ height: "1.4em" }}></div>
      </Form.Item>

      <Form.Item name="rep_coef">
        <Typography.Text>{corrVal(flatsData?.rep_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="sum_coef">
        <Typography.Text>
          {flatsData?.sum_coef ?? "Нет данных"}%
        </Typography.Text>
      </Form.Item>

      <Form.Item name="analog_w">
        <Typography.Text>
          {secureRound(flatsData?.analog_w, -2)}
        </Typography.Text>
      </Form.Item>
      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>
      <Form.Item name="new_per_meter">
        <Typography.Text>
          {rubParser(secureRound(flatsData?.new_per_meter, 0))}
        </Typography.Text>
      </Form.Item>
      <Form.Item name="new_price">
        <Typography.Text>
          {rubParser(secureRound(flatsData?.new_price, 0))}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

export const Calculation = ({ calculationProps, setForecast }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!calculationProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);
  const [roomsNum, setRoomsNum] = useState(0);

  return (
    <div className={classes.container}>
      <div className={classes.select_row}>
        <div className={classes.select_wrap}>
          <Typography.Title level={4}>Эталон:</Typography.Title>
          <Select
            className={classes.referense_select}
            defaultValue="0"
            onChange={(e) => {
              setRoomsNum(e);
            }}
          >
            {calculationProps.state &&
              calculationProps?.data.map((data, index) => {
                return (
                  <Select.Option key={index} value={"" + index}>
                    {`${roomsInetify(data.rooms)} | Адрес: ${data.address}`}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className={classes.calculation_row}>
        <div className={classes.all_titles}>
          <CalculationFormTitles />
          <Form wrapperCol={{ span: 24 }} labelAlign="left">
            <Form.Item>
              <div className={classes.spaser} />
            </Form.Item>
            <Form.Item>
              <Typography.Text>Рыночная стоимость 1 кв.м.</Typography.Text>
            </Form.Item>
            <Form.Item>
              <Typography.Text>Рыночная стоимость</Typography.Text>
            </Form.Item>
            <Form.Item>
              <div className={classes.spaser} />
            </Form.Item>
          </Form>
        </div>
        <div className={classes.forms_wrap}>
          <div className={classes.original_form}>
            <OriginalForm flatsData={calculationProps.data[roomsNum]} />
            <Form
              name="finished_prises"
              wrapperCol={{ span: 24 }}
              labelAlign="left"
            >
              <Form.Item>
                <div className={classes.spaser} />
              </Form.Item>
              <Form.Item name="per_meter">
                <Typography.Text>
                  {rubParser(
                    secureRound(calculationProps.data[roomsNum]?.per_meter, 0),
                  )}
                </Typography.Text>
              </Form.Item>
              <Form.Item name="price">
                <Typography.Text>
                  {rubParser(
                    secureRound(calculationProps.data[roomsNum]?.price, 0),
                  )}
                </Typography.Text>
              </Form.Item>
              <Form.Item>
                <Button
                  className={classes.prognosis_btn}
                  onClick={() => {
                    setForecast.state(true);
                    navigate("/assessment/forecast");
                  }}
                >
                  Рассчитать прогноз
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className={classes.analogs_form}>
            {calculationProps.data[roomsNum].analogs.map(
              (_: number, index: number) => {
                return index < 5 ? (
                  <CorrectingForm
                    index={index}
                    flatsData={calculationProps.data[roomsNum].analogs[index]}
                    key={index}
                  />
                ) : null;
              },
            )}
          </div>
        </div>
      </div>
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/analogs");
          }}
        >
          Вернуться
        </Button>
        <div className={classes.out_bnts}>
          {/* <Popover content="Загрузить">
            <Button icon={<DownloadOutlined />}></Button>
          </Popover>
          <Popover content="Печать">
            <Button icon={<PrinterOutlined />}></Button>
          </Popover> */}
          <Button
            type="primary"
            onClick={() => {
              const { analogs, ...etalon } = calculationProps.data[roomsNum];
              predict(etalon)
                .then((response) => {
                  console.log(response);
                  // sessionStorage.setItem(
                  //   "forecastDataList",
                  //   JSON.stringify(null),
                  // );
                })
                .catch((err) => {
                  console.error(err);
                });
              // navigate("/assessment/argeement");
            }}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};
