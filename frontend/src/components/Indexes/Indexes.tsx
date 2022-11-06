import { Segmented, Select } from "antd";
import { Line } from "@ant-design/charts";
import { useState } from "react";

import dataSet from "../../mock/all_data_indexes.json";

import classes from "./Indexes.module.scss";

const segments = [
  {
    value: "vesrin",
    label: "Весь рынок",
  },
  {
    value: "novostroyki",
    label: "Новостройки",
  },
  {
    value: "vtor",
    label: "Вторичка",
  },
];

const rooms = [
  {
    value: "all",
    label: "Весь рынок",
  },
  {
    value: "0",
    label: "Студия",
  },
  {
    value: "1",
    label: "1K",
  },
  {
    value: "2",
    label: "2K",
  },
  {
    value: "3",
    label: "3K",
  },
  {
    value: "4",
    label: "4K+",
  },
];

const timeInterval = [
  { label: "12 мес", value: 12 },
  { label: "6 мес", value: 6 },
  { label: "3 мес", value: 3 },
];

const data = [
  {
    month: "январь",
    цена: 30,
  },
  {
    month: "февраль",
    цена: 33,
  },
  {
    month: "март",
    цена: 30,
  },
  {
    month: "апрель",
    цена: 29,
  },
  {
    month: "май",
    цена: 32,
  },
  {
    month: "июль",
    цена: 34,
  },
];
const config = {
  data,
  xField: "month",
  yField: "цена",
  meta: {
    цена: {
      min: 20,
      max: 40,
    },
  },
  label: {},
  point: {
    size: 5,
    shape: "diamond",
    style: {
      fill: "white",
      stroke: "#5B8FF9",
      lineWidth: 2,
    },
  },
  tooltip: {
    showMarkers: false,
  },
  state: {
    active: {
      style: {
        shadowBlur: 4,
        stroke: "#000",
        fill: "red",
      },
    },
  },
  interactions: [
    {
      type: "marker-active",
    },
  ],
};

export const Indexes = () => {
  const [selectedSegment, setSelectedSegment] = useState("vesrin");
  const [selectedRooms, setSelectedRooms] = useState("all");
  const [selectedTime, setSelectedTime] = useState(12);

  return (
    <div className={classes.index_container}>
      <div className={classes.selects}>
        <Select
          className={classes.segment_select}
          placeholder="Сегмент"
          options={segments}
          onChange={(e) => {
            setSelectedSegment(e);
          }}
        />
        <Select
          className={classes.rooms_select}
          placeholder="Комнатность"
          options={rooms}
          onChange={(e) => {
            setSelectedRooms(e);
          }}
        />
      </div>
      <div className={classes.price_chart}>
        <Line {...config} />
      </div>
      <div className={classes.price_chart}>
        <Line {...config} />
      </div>
      <Segmented
        options={timeInterval}
        onChange={(e) => {
          setSelectedTime(e);
        }}
      />
    </div>
  );
};
