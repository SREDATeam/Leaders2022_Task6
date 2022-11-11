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
  return (delta: number, isInt?: boolean) => {
    if (isInt) {
      return (
        <div>
          <Typography.Text
            style={{
              color: delta > 0 ? "green" : delta == 0 ? "black" : "red",
            }}
          >
            {delta}
            {`\u20bd`}
          </Typography.Text>
          <div>{rubParser((newCost += delta))}</div>
        </div>
      );
    } else {
      const value = secureRound((newCost / 100) * delta, 0);
      return (
        <div>
          <Typography.Text
            style={{
              color: delta > 0 ? "green" : delta == 0 ? "black" : "red",
            }}
          >
            {delta}% | {value}
            {`\u20bd`}
          </Typography.Text>
          <div>{rubParser((newCost += value))}</div>
        </div>
      );
    }
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
        <div style={{ height: "6em" }}>Адрес</div>
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

const OriginalForm = ({ data }: { data: any }) => {
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
        <div style={{ height: "6em" }}>{data?.address || "Нет данных"}</div>
      </Form.Item>

      <Form.Item name="metro">
        <Typography.Text>{data?.metro || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="seg">
        <Typography.Text>{segInetify(data?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="mat">
        <Typography.Text>{wallInetify(data?.mat)}</Typography.Text>
      </Form.Item>

      <Form.Item name="floors">
        <Typography.Text>
          {data?.floors ? data.floors : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Typography.Text>
          {data?.floor ? data.floor : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="rooms">
        <Typography.Text>{roomsInetify(data?.rooms)}</Typography.Text>
      </Form.Item>

      <Form.Item name="area">
        <Typography.Text>{data?.area ?? "Нет данных"} м.кв.</Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {data?.area_kitchen ?? "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk">
        <Typography.Text>{balcInetify(data?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="repair">{remInetify(data?.repair)}</Form.Item>
    </Form>
  );
};

const CorrectingForm = ({ index, data }: { index: number; data: any }) => {
  const corrVal = corrValues(data?.per_meter);
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
        <div style={{ height: "6em" }}>{data?.address || "Нет данных"}</div>
      </Form.Item>

      <Form.Item name="metro">
        <Typography.Text>{data?.metro || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="seg">
        <Typography.Text>{segInetify(data?.seg)}</Typography.Text>
      </Form.Item>

      <Form.Item name="mat">
        <Typography.Text>{wallInetify(data?.mat)}</Typography.Text>
      </Form.Item>

      <Form.Item name="floors">
        <Typography.Text>{data?.floors || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Typography.Text>{data?.floor || "Нет данных"}</Typography.Text>
      </Form.Item>

      <Form.Item name="rooms">
        <Typography.Text>{roomsInetify(data?.rooms)}</Typography.Text>
      </Form.Item>

      <Form.Item name="area">
        <Typography.Text>{data?.area || "Нет данных"} м.кв.</Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {data?.area_kitchen || "Нет данных"} м.кв.
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balk">
        <Typography.Text>{balcInetify(data?.balk)}</Typography.Text>
      </Form.Item>

      <Form.Item name="repair">
        <Typography.Text>{remInetify(data?.repair)}</Typography.Text>
      </Form.Item>

      <Form.Item name="price">
        <Typography.Text>
          {rubParser(secureRound(data?.price, 0))}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="per_meter">
        <Typography.Text>
          {rubParser(secureRound(data?.per_meter, 0))}
        </Typography.Text>
      </Form.Item>

      <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="main_corr">{corrVal(data?.main_corr)}</Form.Item>

      <Form.Item name="area_coef">
        <Typography.Text>{corrVal(data?.area_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="metro_coef">
        <Typography.Text>{corrVal(data?.metro_coef)}</Typography.Text>
        <div style={{ height: "1.4em" }}></div>
      </Form.Item>

      <Form.Item name="floor_coef">
        <Typography.Text>{corrVal(data?.floor_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="kit_coef">
        <Typography.Text>{corrVal(data?.kit_coef)}</Typography.Text>
      </Form.Item>

      <Form.Item name="balk_coef">
        <Typography.Text>{corrVal(data?.balk_coef)}</Typography.Text>
        <div style={{ height: "1.4em" }}></div>
      </Form.Item>

      <Form.Item name="rep_coef">
        <Typography.Text>{corrVal(data?.rep_coef, true)}</Typography.Text>
      </Form.Item>

      <Form.Item name="sum_coef">
        <Typography.Text>{data?.sum_coef ?? "Нет данных"}%</Typography.Text>
      </Form.Item>

      <Form.Item name="analog_w">
        <Typography.Text>{secureRound(data?.analog_w, -2)}</Typography.Text>
      </Form.Item>
      {/* <Form.Item>
        <div className={classes.spaser} />
      </Form.Item>
      <Form.Item name="new_per_meter">
        <Typography.Text>
          {rubParser(secureRound(data?.new_per_meter, 0))}
        </Typography.Text>
      </Form.Item>
      <Form.Item name="new_price">
        <Typography.Text>
          {rubParser(secureRound(data?.new_price, 0))}
        </Typography.Text>
      </Form.Item> */}
    </Form>
  );
};

export const Calculation = ({
  calculationProps,
  setForecast,
  forecastProps,
}) => {
  const [roomsNum, setRoomsNum] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!calculationProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

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
            <OriginalForm data={calculationProps.data[roomsNum]} />
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
                  loading={isLoading}
                  disabled={isLoading}
                  className={classes.prognosis_btn}
                  onClick={() => {
                    const { analogs, ...etalon } =
                      calculationProps.data[roomsNum];
                    setIsLoading(true);
                    predict({ etalon })
                      .then((response: number[]) => {
                        const forecast = {
                          ...calculationProps.data[roomsNum],
                          forecast: response.data[2],
                        };
                        setForecast.data(forecast);
                        sessionStorage.setItem(
                          "forecastDataList",
                          JSON.stringify(forecast),
                        );
                        setForecast.state(true);
                        navigate("/assessment/forecast");
                      })
                      .catch((err) => {
                        console.error(err);
                      })
                      .finally(() => {
                        setIsLoading(false);
                      });
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
                    data={calculationProps.data[roomsNum].analogs[index]}
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
              navigate("/assessment/argeement");
            }}
          >
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
};
