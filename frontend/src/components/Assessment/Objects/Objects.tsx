import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "antd";

import classes from "./Objects.module.scss";
import clsx from "clsx";
import { loadExcel } from "api/floors";
import { SyncOutlined } from "@ant-design/icons";
import { Indexes } from "components/Indexes/Indexes";

export const Objects = ({
  floorsProps,
  setFloorsProps,
  setCalculationProps,
  setForecastProps,
  setPoolProps,
}) => {
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
          callback(etalonsList);
          setFloorsProps.data(etalonsList);
          sessionStorage.setItem("floorsDataList", JSON.stringify(etalonsList));
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

  const del_file = () => {
    setFloorsProps.data(null);
    setFloorsProps.state(false);
    setCalculationProps.data(null);
    setCalculationProps.state(false);
    setForecastProps.data(null);
    setForecastProps.state(false);
    setPoolProps.data(null);
    setPoolProps.state(false);
    sessionStorage.setItem("floorsDataList", JSON.stringify(null));
    sessionStorage.setItem("calculationDataList", JSON.stringify(null));
    sessionStorage.setItem("forecastDataList", JSON.stringify(null));
    sessionStorage.setItem("poolDataList", JSON.stringify(null));
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

    const referenceCollection = new ymaps.GeoObjectCollection();

    const fillMap = (list) => {
      list.forEach((element) => {
        const coords = [element.lat, element.lng];

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

        referenceCollection.add(
          new ymaps.Circle(
            [coords, 1000],
            {},
            {
              fillOpacity: 0.4,
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
      });
    };
    haveData && fillMap(floorsProps.data);
    const fileInput = document.getElementById(
      "file_loader",
    ) as HTMLInputElement;
    const fileDelete = document.getElementById(
      "file_delete",
    ) as HTMLInputElement;
    const fileData = new FormData();
    const inputLisener = ymaps.domEvent.manager
      .group(fileInput)
      .add(["change"], function (event) {
        const file = fileInput?.files[0];
        fileData.append("data", file);
        loadFloors(fillMap, haveData, fileData);
        haveData = true;
      });
    const delLisener = ymaps.domEvent.manager
      .group(fileDelete)
      .add(["click"], function (event) {
        fileData.delete("data");
        fileInput.value = "";
        referenceCollection.removeAll();
        del_file();
        haveData = false;
      });

    myMap.geoObjects.add(referenceCollection);
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
          <div
            className={clsx(
              classes.file_delete,
              floorsProps.state && classes.active,
            )}
          >
            <Typography.Text>Данные загруженны</Typography.Text>
            <Button id="file_delete" size="small">
              Удалить
            </Button>
          </div>
          <label
            className={clsx(
              classes.file_loader,
              !floorsProps.state && !isLoading && classes.active,
            )}
          >
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
