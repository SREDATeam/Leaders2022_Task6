import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Form, Select, Typography, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import classes from "./Calculation.module.scss";

interface FieldData {
  name: string;
  value: any;
}

const CalculationFormTitles = () => {
  return (
    <Form
      className={classes.calculation_titles}
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
        <Typography.Text>Сострояние</Typography.Text>
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
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на площадь</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на удаленность от метро</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на этаж</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на площадь кухни</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>
          Корректировка на наличие балкона/лоджии
        </Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Корректировка на состояние</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Сумма коррекировок</Typography.Text>
      </Form.Item>
      <Form.Item>
        <Typography.Text>Вес аналога</Typography.Text>
      </Form.Item>
    </Form>
  );
};

const OriginalForm = ({
  fields,
  flatsData,
}: {
  fields: FieldData[];
  flatsData: any;
}) => {
  return (
    <Form
      className={classes.calculation_form}
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
          Объект оценки
        </Typography.Title>
      </Form.Item>

      <Form.Item name="subject">
        <Typography.Text>Москва</Typography.Text>
      </Form.Item>

      <Form.Item name="city">
        <Typography.Text>
          {flatsData?.city ? flatsData.city : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="AO">
        <Typography.Text>
          {flatsData?.AO ? flatsData.AO : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="district">
        <Typography.Text>
          {flatsData?.district ? flatsData.district : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="street">
        <Typography.Text>
          {flatsData?.street ? flatsData.street : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="house_num">
        <Typography.Text>
          {flatsData?.house_num ? flatsData.house_num : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="metro_station">
        <Typography.Text>
          {flatsData?.metro_station ? flatsData.metro_station : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="time_to_station">
        <Typography.Text>
          {flatsData?.time_to_station
            ? flatsData.time_to_station
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="segment">
        <Typography.Text>
          {flatsData?.segment ? flatsData.segment : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="constraction_year">
        <Typography.Text>
          {flatsData?.constraction_year
            ? flatsData.constraction_year
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="wall_material">
        <Typography.Text>
          {flatsData?.wall_material ? flatsData.wall_material : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="floor_num">
        <Typography.Text>
          {flatsData?.floor_num ? flatsData.floor_num : "Нет данных"}
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

      <Form.Item name="rooms_num">
        <Typography.Text>
          {flatsData?.rooms_num ? flatsData.rooms_num : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="total_area">
        <Typography.Text>
          {flatsData?.total_area ? flatsData.total_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="living_area">
        <Typography.Text>
          {flatsData?.living_area ? flatsData.living_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {flatsData?.kitchen_area ? flatsData.kitchen_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balcony">
        <Typography.Text>
          {flatsData?.balcony ? flatsData.balcony : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="condition">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

const CorrectingForm = ({
  fields,
  index,
  flatsData,
}: {
  fields: FieldData[];
  index: string;
  flatsData: any;
}) => {
  return (
    <Form
      className={classes.calculation_form}
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
      <Form.Item name="subject">
        <Typography.Text>Москва</Typography.Text>
      </Form.Item>

      <Form.Item name="city">
        <Typography.Text>
          {flatsData?.city ? flatsData.city : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="AO">
        <Typography.Text>
          {flatsData?.AO ? flatsData.AO : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="district">
        <Typography.Text>
          {flatsData?.district ? flatsData.district : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="street">
        <Typography.Text>
          {flatsData?.street ? flatsData.street : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="house_num">
        <Typography.Text>
          {flatsData?.house_num ? flatsData.house_num : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="metro_station">
        <Typography.Text>
          {flatsData?.metro_station ? flatsData.metro_station : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="time_to_station">
        <Typography.Text>
          {flatsData?.time_to_station
            ? flatsData.time_to_station
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="segment">
        <Typography.Text>
          {flatsData?.segment ? flatsData.segment : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="constraction_year">
        <Typography.Text>
          {flatsData?.constraction_year
            ? flatsData.constraction_year
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="wall_material">
        <Typography.Text>
          {flatsData?.wall_material ? flatsData.wall_material : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="floor_num">
        <Typography.Text>
          {flatsData?.floor_num ? flatsData.floor_num : "Нет данных"}
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

      <Form.Item name="rooms_num">
        <Typography.Text>
          {flatsData?.rooms_num ? flatsData.rooms_num : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="total_area">
        <Typography.Text>
          {flatsData?.total_area ? flatsData.total_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="living_area">
        <Typography.Text>
          {flatsData?.living_area ? flatsData.living_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Typography.Text>
          {flatsData?.kitchen_area ? flatsData.kitchen_area : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balcony">
        <Typography.Text>
          {flatsData?.balcony ? flatsData.balcony : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="condition">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="offer_prise">
        <Typography.Text>
          {flatsData?.offer_prise ? flatsData.offer_prise : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="metr_prise">
        <Typography.Text>
          {flatsData?.metr_prise ? flatsData.metr_prise : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="tender_adjustment">
        <Typography.Text>
          {flatsData?.tender_adjustment
            ? flatsData.tender_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="area_adjustment">
        <Typography.Text>
          {flatsData?.area_adjustment
            ? flatsData.area_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="time_to_station_adjustment">
        <Typography.Text>
          {flatsData?.time_to_station_adjustment
            ? flatsData.time_to_station_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="floor_adjustment">
        <Typography.Text>
          {flatsData?.floor_adjustment
            ? flatsData.floor_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="kitchen_adjustment">
        <Typography.Text>
          {flatsData?.kitchen_adjustment
            ? flatsData.kitchen_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="balcony_adjustment">
        <Typography.Text>
          {flatsData?.balcony_adjustment
            ? flatsData.balcony_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="condition_adjustment">
        <Typography.Text>
          {flatsData?.condition_adjustment
            ? flatsData.condition_adjustment
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="adjustment_summ">
        <Typography.Text>
          {flatsData?.adjustment_summ
            ? flatsData.adjustment_summ
            : "Нет данных"}
        </Typography.Text>
      </Form.Item>

      <Form.Item name="analog_weight">
        <Typography.Text>
          {flatsData?.analog_weight ? flatsData.analog_weight : "Нет данных"}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

const flatsData = null;

export const Calculation = ({ calculationProps, setForecast }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!calculationProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

  const fields: FieldData[] = [{ name: "condition", value: "none" }];

  return (
    <div className={classes.container}>
      <div className={classes.select_row}>
        <div className={classes.select_wrap}>
          <Typography.Title level={4}>
            Аналоги для эталонного объекта:
          </Typography.Title>
          <Select className={classes.referense_select} defaultValue="0">
            <Select.Option value="0">Лобненская д.30, Студии</Select.Option>
            <Select.Option value="1">Лобненская д.30, Однушки</Select.Option>
            <Select.Option value="2">Лобненская д.30, Двушки</Select.Option>
            <Select.Option value="3">Лобненская д.30, Трешки</Select.Option>
            <Select.Option value="4">
              Лобненская д.30, Многокомнатные
            </Select.Option>
          </Select>
        </div>
      </div>
      <div className={classes.calculation_row}>
        <div className={classes.all_titles}>
          <CalculationFormTitles />
          <Form name="prise_titles" wrapperCol={{ span: 24 }} labelAlign="left">
            <Form.Item name="spaser">
              <div className={classes.spaser} />
            </Form.Item>
            <Form.Item>
              <Typography.Text>Рыночная стоимость 1 кв.м.</Typography.Text>
            </Form.Item>
            <Form.Item>
              <Typography.Text>Рыночная стоимость</Typography.Text>
            </Form.Item>
            <Form.Item name="spaser">
              <div className={classes.spaser} />
            </Form.Item>
          </Form>
        </div>
        <div className={classes.original_form}>
          <OriginalForm fields={fields} flatsData={undefined} />
          <Form
            name="finished_prises"
            wrapperCol={{ span: 24 }}
            labelAlign="left"
          >
            <Form.Item name="spaser">
              <div className={classes.spaser} />
            </Form.Item>
            <Form.Item name="metr_price">
              <Typography.Text>
                {flatsData?.analog_weight
                  ? flatsData.analog_weight
                  : "Нет данных"}
              </Typography.Text>
            </Form.Item>
            <Form.Item name="price">
              <Typography.Text>
                {flatsData?.analog_weight
                  ? flatsData.analog_weight
                  : "Нет данных"}
              </Typography.Text>
            </Form.Item>
            <Form.Item name="price">
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
        <CorrectingForm fields={fields} flatsData={undefined} index="1" />
        <CorrectingForm fields={fields} flatsData={undefined} index="2" />
        <CorrectingForm fields={fields} flatsData={undefined} index="3" />
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
          <Popover content="Загрузить">
            <Button icon={<DownloadOutlined />}></Button>
          </Popover>
          <Popover content="Печать">
            <Button icon={<PrinterOutlined />}></Button>
          </Popover>
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
