import { SearchOutlined } from "@ant-design/icons";
import { Table, DatePicker, Input } from "antd";
import { ColumnType } from "antd/lib/table";
import moment from "moment";

import classes from "./Archive.module.scss";

interface DataType {
  key: string;
  date: string;
  address: string;
}

const mock = [
  {
    key: "1",
    date: "02.11.2021",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "2",
    date: "02.11.2021",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "3",
    date: "02.12.2021",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "4",
    date: "01.10.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "5",
    date: "02.02.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "6",
    date: "01.10.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "7",
    date: "02.02.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "8",
    date: "01.10.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "9",
    date: "02.02.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "10",
    date: "01.10.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "11",
    date: "02.02.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "522",
    date: "01.10.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
  {
    key: "112",
    date: "02.02.2022",
    address: "г. Москва. ул. Красных партизан, д. 21, кв. 46",
  },
];

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
    const itemDate = moment(item.date, "DD.MM.YYYY");

    return itemDate.isBetween(filterDates[0], filterDates[1]);
  },
});

const getAdderssSearchProps = (): ColumnType<DataType> => ({
  filterDropdown: ({ setSelectedKeys, confirm }) => (
    <Input
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
];

export const Archive = () => {
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
        dataSource={mock}
        columns={columns}
      />
    </div>
  );
};
