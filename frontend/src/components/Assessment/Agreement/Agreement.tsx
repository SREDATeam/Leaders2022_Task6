import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Button, Form, Typography, Popover, Table, Tooltip } from "antd";
import {
  segInetify,
  remInetify,
  roomsInetify,
  balcInetify,
  wallInetify,
} from "../../../utils/indentify";
import { secureRound } from "../../../utils/rounding";

import classes from "./Agreement.module.scss";
import { numParser, rubParser } from "utils/parsers";

const AgreementForm = ({ index, data }: { index: number; data: any }) => {
  return (
    <Form
      colon={false}
      className={classes.agreement_form}
      name="bilding_form"
      labelAlign="left"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 12, offset: 4 }}
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

      <Typography.Text>Рыночная стоймость</Typography.Text>
      <Form.Item name="per_meter" wrapperCol={{ span: 24 }}>
        <Typography.Text>
          {numParser(secureRound(data?.price, 0))}
          {`\u20bd`}
        </Typography.Text>
      </Form.Item>

      <Typography.Text>Рыночная стоймость за м.кв.</Typography.Text>
      <Form.Item name="per_meter" wrapperCol={{ span: 24 }}>
        <Typography.Text>
          {numParser(secureRound(data?.per_meter, 0))}
          {`\u20bd`}
        </Typography.Text>
      </Form.Item>
    </Form>
  );
};

const poolColums = [
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
    // render: (address) => {
    //   const splited = address.split(",");
    //   return splited.splice(2, 4).join(", ");
    // },
  },
  {
    title: "Комнаты",
    dataIndex: "rooms",
    key: "rooms",
    render: (room) => roomsInetify(+room),
  },
  {
    title: "Сегмент",
    dataIndex: "seg",
    key: "seg",
    render: (seg) => segInetify(+seg),
  },
  {
    title: "Рыночная стоймость",
    dataIndex: "price",
    key: "price",
    render: (price) => rubParser(+price),
  },
  {
    title: "Рыночная стоймость за м.кв.",
    dataIndex: "per_meter",
    key: "per_meter",
    render: (metPrise) => rubParser(+metPrise),
  },
];

export const Agreement = ({ calculationProps, poolProps }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!calculationProps.state) {
      navigate("/assessment/objects", { replace: true });
    }
  }, []);

  const indexedPool = poolProps?.data.map((elem, index) => {
    return { ...elem, key: index };
  });
  return (
    <div className={classes.container}>
      <div className={classes.agreement_row}>
        {calculationProps.data?.map((data, index) => {
          return <AgreementForm index={index} data={data} key={index} />;
        })}
      </div>
      <Typography.Title level={3} className={classes.pool_title}>
        Рассчитанный пул объектов
      </Typography.Title>
      <Table
        pagination={{ position: ["bottomCenter"] }}
        className={classes.pool_objects}
        dataSource={indexedPool}
        columns={poolColums}
        expandable={{
          expandedRowRender: (data) => (
            <>
              <p>
                <b>Адрес:</b> {data.address}
              </p>
              <p>
                <b>Материал стен:</b> {wallInetify(data.mat)}
                <b style={{ marginLeft: "1em" }}>Состояние:</b>{" "}
                {remInetify(data.repair)}
                <b style={{ marginLeft: "1em" }}>Лоджия/Балкон:</b>{" "}
                {balcInetify(data.balk)}
              </p>
              <p style={{ margin: "0" }}>
                <b>Площадь общая:</b> {data.area}м.кв.
                <b style={{ marginLeft: "1em" }}>Площадь кухни:</b>{" "}
                {data.area_kitchen}м.кв.
              </p>
            </>
          ),
        }}
      />
      <div className={classes.btns}>
        <Button
          onClick={() => {
            navigate("/assessment/calculation");
          }}
        >
          Вернуться
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigate("/assessment/archive");
          }}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};
