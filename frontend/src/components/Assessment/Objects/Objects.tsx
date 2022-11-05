import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "antd";

import classes from "./Objects.module.scss";
import { UploadOutlined } from "@ant-design/icons";
import clsx from "clsx";

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

export const Objects = ({ data, setData, setDataState }) => {
  const navigate = useNavigate();
  const [mokeState, setMokeState] = useState(!!data);
  const [isLoading, setIsLoading] = useState(false);

  const fakeLoad = (callback, data, haveData) => {
    if (!haveData) {
      setIsLoading(true);
      setTimeout(() => {
        callback(data);
        setData(data);
        setDataState(true);
        setMokeState(true);
        setIsLoading(false);
      }, 2000);
    } else {
      console.error("Данные уже загруженны");
    }
  };

  let myMap = null;

  function init() {
    let haveData = mokeState;

    myMap = new ymaps.Map(
      "map",
      {
        center: [55.752004, 37.617734],
        zoom: 11,
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

    searchControl.events.add("resultselect", function (event) {
      const index = event.get("index");
      searchControl.getResult(index).then(function (res) {
        const address =
          res.properties.get("metaDataProperty").GeocoderMetaData.Address
            .Components;
        const addressLine =
          res.properties.get("metaDataProperty").GeocoderMetaData.Address
            .formatted;
        const hasHouse = address.find((comp) => {
          return comp.kind === "house";
        });
      });
    });

    const fillMap = (list) => {
      list.forEach((element) => {
        const myGeocoder = ymaps.geocode(element.reference.address);
        myGeocoder.then(function (res) {
          const coords = res.geoObjects.get(0).geometry.getCoordinates();
          const referenceCollection = new ymaps.GeoObjectCollection();

          referenceCollection.add(
            new ymaps.Circle(
              [coords, 1000],
              {},
              {
                // fillColor: "#FFFFFF",
                fillOpacity: 0.7,
                // strokeColor: "#000000",
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

          element.analogues.forEach((analogue) => {
            const analogGeocoder = ymaps.geocode(analogue.address);
            analogGeocoder.then(function (res) {
              const coords = res.geoObjects.get(0).geometry.getCoordinates();

              referenceCollection.add(
                new ymaps.Circle(
                  [coords, 8],
                  {},
                  {
                    fillColor: "#FFFF00",
                    strokeColor: "#FFFF00",
                    strokeWidth: 2,
                  },
                ),
              );
            });
          });
          myMap.geoObjects.add(referenceCollection);
        });
      });
    };

    haveData && fillMap(data);
    const targetElement = document.getElementById("load_btn");
    const events = ["click", "dblclick"];
    const divListeners = ymaps.domEvent.manager
      .group(targetElement)
      .add(events, function (event) {
        fakeLoad(fillMap, mock, haveData);
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
        <div className={classes.load_window}>
          <Button
            id="load_btn"
            icon={<UploadOutlined />}
            loading={isLoading}
            type="primary"
          >
            Загрузить пул объектов
          </Button>
          <div className={clsx(classes.next, mokeState && classes.active)}>
            <Button
              type="primary"
              onClick={() => {
                if (mokeState) navigate("/assessment/bilding");
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
