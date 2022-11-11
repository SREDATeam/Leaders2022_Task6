import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, DatePicker, Input, Typography } from "antd";
import { ColumnType } from "antd/lib/table";
import moment from "moment";

import classes from "./Archive.module.scss";
import { getArchive, getExel } from "api/floors";

interface DataType {
  key: string;
  date: string;
  address: string;
}

const getDateSearchProps = (): ColumnType<DataType> => ({
  filterDropdown: ({ setSelectedKeys, confirm }) => (
    <DatePicker.RangePicker
      className={classes.date_piker}
      format={"DD.MM.YYYY"}
      onChange={(e) => {
        console.log(e);
        setSelectedKeys(
          e ? [e.map((date) => date!.format("DD.MM.YYYY")).join("|")] : [],
        );
        confirm();
      }}
      allowClear={true}
    />
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : "#000" }} />
  ),
  onFilter: (value, item) => {
    const filterDates = (value as string)
      .split("|")
      .map((date: string) => moment(date, "DD.MM.YYYY"));

    const itemDate = moment(item.date);

    return itemDate.isBetween(filterDates[0], filterDates[1]);
  },
  render: (date) => moment(date).format("DD.MM.YYYY"),
});

const getAdderssSearchProps = (): ColumnType<DataType> => ({
  filterDropdown: ({ setSelectedKeys, confirm }) => (
    <Input
      allowClear
      placeholder={"Найти адрес"}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={() => confirm()}
    />
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? "#1890ff" : "#000" }} />
  ),
  onFilter: (value, item) =>
    item.address.toLowerCase().includes((value as string).toLowerCase()),
});

const columns = [
  {
    title: "Дата",
    dataIndex: "date",
    key: "date",
    width: "20%",
    ...getDateSearchProps(),
  },
  {
    title: "Адрес",
    dataIndex: "address",
    key: "address",
    ...getAdderssSearchProps(),
  },
  {
    title: "Файлы",
    dataIndex: "id",
    key: "id",
    width: "20%",
    render: (elem) => (
      <Typography.Link
        onClick={() => {
          getExel(elem);
        }}
      >
        Загрузить
      </Typography.Link>
    ),
  },
];

export const Archive = () => {
  const [data, setData] = useState();
  useEffect(() => {
    getArchive()
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={classes.container}>
      <Table
        // scroll={{ y: "100%" }}
        sticky
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20, 50, 100],
          position: ["bottomCenter"],
        }}
        className={classes.archive_table}
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};
