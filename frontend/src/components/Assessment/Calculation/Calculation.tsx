import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Form, Select, Input, Typography, Popover } from "antd";

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

const OriginalForm = ({ fields }: { fields: FieldData[] }) => {
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
        <Input />
      </Form.Item>

      <Form.Item name="city">
        <Input />
      </Form.Item>

      <Form.Item name="AO">
        <Input />
      </Form.Item>

      <Form.Item name="district">
        <Input />
      </Form.Item>

      <Form.Item name="street">
        <Input />
      </Form.Item>

      <Form.Item name="house_num">
        <Input />
      </Form.Item>

      <Form.Item name="metro_station">
        <Input />
      </Form.Item>

      <Form.Item name="time_to_station">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="segment">
        <Input />
      </Form.Item>

      <Form.Item name="constraction_year">
        <Input />
      </Form.Item>

      <Form.Item name="wall_material">
        <Input />
      </Form.Item>

      <Form.Item name="floor_num">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Input />
      </Form.Item>

      <Form.Item name="rooms_num">
        <Input />
      </Form.Item>

      <Form.Item name="total_area">
        <Input />
      </Form.Item>

      <Form.Item name="living_area">
        <Input />
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Input />
      </Form.Item>

      <Form.Item name="balcony">
        <Input />
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
}: {
  fields: FieldData[];
  index: string;
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
        <Input />
      </Form.Item>

      <Form.Item name="city">
        <Input />
      </Form.Item>

      <Form.Item name="AO">
        <Input />
      </Form.Item>

      <Form.Item name="district">
        <Input />
      </Form.Item>

      <Form.Item name="street">
        <Input />
      </Form.Item>

      <Form.Item name="house_num">
        <Input />
      </Form.Item>

      <Form.Item name="metro_station">
        <Input />
      </Form.Item>

      <Form.Item name="time_to_station">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="segment">
        <Input />
      </Form.Item>

      <Form.Item name="constraction_year">
        <Input />
      </Form.Item>

      <Form.Item name="wall_material">
        <Input />
      </Form.Item>

      <Form.Item name="floor_num">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="floor">
        <Input />
      </Form.Item>

      <Form.Item name="rooms_num">
        <Input />
      </Form.Item>

      <Form.Item name="total_area">
        <Input />
      </Form.Item>

      <Form.Item name="living_area">
        <Input />
      </Form.Item>

      <Form.Item name="kitchen_area">
        <Input />
      </Form.Item>

      <Form.Item name="balcony">
        <Input />
      </Form.Item>

      <Form.Item name="condition">
        <Select>
          <Select.Option value="none">Нет</Select.Option>
          <Select.Option value="economic">Эконом</Select.Option>
          <Select.Option value="improved">Улучшенная</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="offer_prise">
        <Input />
      </Form.Item>

      <Form.Item name="metr_prise">
        <Input />
      </Form.Item>

      <Form.Item name="spaser">
        <div className={classes.spaser} />
      </Form.Item>

      <Form.Item name="tender_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="area_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="time_to_station_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="floor_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="kitchen_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="balcony_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="condition_adjustment">
        <Input />
      </Form.Item>

      <Form.Item name="adjustment_summ">
        <Input />
      </Form.Item>

      <Form.Item name="analog_weight">
        <Input />
      </Form.Item>
    </Form>
  );
};

export const Calculation = () => {
  const fields: FieldData[] = [{ name: "condition", value: "none" }];

  return (
    <div className={classes.container}>
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
          <OriginalForm fields={fields} />
          <Form
            name="finished_prises"
            wrapperCol={{ span: 24 }}
            labelAlign="left"
          >
            <Form.Item name="spaser">
              <div className={classes.spaser} />
            </Form.Item>
            <Form.Item name="metr_price">
              <Input />
            </Form.Item>
            <Form.Item name="price">
              <Input />
            </Form.Item>
            <Form.Item name="price">
              <Button className={classes.prognosis_btn}>
                Рассчитать прогноз
              </Button>
            </Form.Item>
          </Form>
        </div>
        <CorrectingForm fields={fields} index="1" />
        <CorrectingForm fields={fields} index="2" />
        <CorrectingForm fields={fields} index="3" />
      </div>
      <div className={classes.btns}>
        <Button>Вернуться</Button>
        <div className={classes.out_bnts}>
          <Popover content="Загрузить">
            <Button icon={<DownloadOutlined />}></Button>
          </Popover>
          <Popover content="Печать">
            <Button icon={<PrinterOutlined />}></Button>
          </Popover>
          <Button type="primary">Продолжить</Button>
        </div>
      </div>
    </div>
  );
};
