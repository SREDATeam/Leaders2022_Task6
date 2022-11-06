import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "antd";

import classes from "./Objects.module.scss";
import clsx from "clsx";
import { loadExcel } from "api/floors";
import { SyncOutlined } from "@ant-design/icons";
import { Indexes } from "components/Indexes/Indexes";

const mock = [
  {
    reference: {
      address: "Россия, Москва, улица Ивана Бабушкина, 2",
      floor: 2,
      rooms: 2,
      total_area: 80,
      living_area: 66,
      kitchen_area: 14,
      balcony: "Балкон",
      condition: "Улучшеный",
    },
    analogues: [
      {
        address: "Россия, Москва, улица Вавилова, 56",
        floor: 4,
      },
      {
        address: "Россия, Москва, улица Дмитрия Ульянова, 4к2",
        floor: 1,
      },
      {
        address: "Россия, Москва, улица Дмитрия Ульянова, 17к1",
        floor: 9,
      },
      {
        address: "Россия, Москва, Профсоюзная улица, 12",
        floor: 7,
      },
      {
        address: "Россия, Москва, Нахимовский проспект, 65",
        floor: 4,
      },
      {
        address: "Россия, Москва, проспект 60-летия Октября, 14",
        floor: 7,
      },
      {
        address: "Россия, Москва, улица Кржижановского, 3",
        floor: 3,
      },
    ],
  },
];

export const Objects = ({ floorsProps, setFloorsProps }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const loadFloors = (callback, haveData, file) => {
    if (!haveData) {
      setIsLoading(true);
      loadExcel(file)
        .then((response) => {
          const etalons = response?.data.etalon;
          const analogs = response?.data.analogs;
          const etalonsList = Object.keys(etalons).map((key) => {
            const bundle = etalons[key][0];
            const newBundle = { ...bundle };
            newBundle.analogs = analogs[key];
            return newBundle;
          });
          console.log(etalonsList);
          callback(etalonsList);
          setFloorsProps.data(etalonsList);
          setFloorsProps.state(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      console.error("Данные уже загруженны");
    }
  };

  let myMap = null;

  function init() {
    let haveData = floorsProps.state;

    myMap = new ymaps.Map(
      "map",
      {
        center: [55.672004, 37.477734],
        zoom: 10,
        controls: ["fullscreenControl"],
      },
      {
        yandexMapDisablePoiInteractivity: true,
      },
    );

    const zoomControl = new ymaps.control.ZoomControl({
      options: {
        size: "auto",
        position: {
          right: 10,
          top: 50,
        },
      },
    });

    const typeControl = new ymaps.control.TypeSelector({
      mapTypes: ["yandex#map", "yandex#satellite"],
      options: { panoramasItemMode: "off" },
    });

    const searchControl = new ymaps.control.SearchControl({
      options: {
        useMapBounds: true,
        noPlacemark: true,
      },
    });

    const fillMap = (list) => {
      list.forEach((element) => {
        const coords = [element.lat, element.lng];
        const referenceCollection = new ymaps.GeoObjectCollection();
        referenceCollection.add(
          new ymaps.Circle(
            [coords, 1000],
            {},
            {
              fillOpacity: 0.7,
              strokeOpacity: 0.7,
              strokeWidth: 1,
            },
          ),
        );
        referenceCollection.add(
          new ymaps.Circle(
            [coords, 8],
            {},
            {
              fillColor: "#0000FF",
              strokeColor: "#0000FF",
              strokeWidth: 2,
            },
          ),
        );

        element.analogs.forEach((analog) => {
          const coords = [analog.lat, analog.lng];

          referenceCollection.add(
            new ymaps.Circle(
              [coords, 12],
              {},
              {
                fillColor: "#FF0000",
                strokeColor: "#FF0000",
                strokeWidth: 4,
              },
            ),
          );
        });
        myMap.geoObjects.add(referenceCollection);
      });
    };

    haveData && fillMap(floorsProps.data);
    const targetElement = document.getElementById("file_loader");
    const divListeners = ymaps.domEvent.manager
      .group(targetElement)
      .add(["change"], function (event) {
        const fileData = new FormData();
        const file = document.getElementById("file_loader")?.files[0];
        fileData.append("data", file);
        loadFloors(fillMap, haveData, fileData);
        haveData = true;
      });

    myMap.controls.add(searchControl).add(zoomControl).add(typeControl);
  }

  useEffect(() => {
    ymaps.ready(init);

    return () => {
      myMap.destroy();
    };
  }, []);

  return (
    <>
      <div id="map" className={classes.map}>
        <div className={classes.indexes}>{/* <Indexes /> */}</div>
        <div className={classes.load_window}>
          <div
            className={clsx(classes.load_label, isLoading && classes.active)}
          >
            <Typography.Text className={classes.text}>
              Идет загрузка
            </Typography.Text>
            <SyncOutlined spin className={classes.icon} />
          </div>
          <label className={classes.file_loader}>
            <Typography.Text className={classes.text}>
              Загрузить пул объектов
            </Typography.Text>
            <input
              id="file_loader"
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </label>
          <div
            className={clsx(classes.next, floorsProps.state && classes.active)}
          >
            <Button
              type="primary"
              style={{ visibility: floorsProps.state ? "visible" : "hidden" }}
              onClick={() => {
                if (floorsProps.state) navigate("/assessment/bilding");
              }}
            >
              Далее
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
