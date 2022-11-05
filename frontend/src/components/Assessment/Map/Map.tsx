import { useState, useEffect } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

import classes from "./Map.module.scss";

export const Map = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [modalNavigate, setModalNavigate] = useState(false);
  const [modalData, setModalData] = useState("");

  let myMap = null;

  function init() {
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
        setModalNavigate(false);
        setModalData(addressLine);
        setModalShow(true);
        if (hasHouse) {
          setModalNavigate(true);
        }
      });
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
      <div id="map" className={classes.map}></div>
      <Modal
        title="Подтвердите данные"
        centered
        closable={false}
        open={modalShow}
        cancelText="Отменить"
        onCancel={() => setModalShow(false)}
        okText="Продолжить"
        okButtonProps={{ disabled: !modalNavigate }}
        onOk={() => {
          // navigate("steps/task");
        }}
      >
        {modalData}
        {!modalNavigate ? (
          <div className={classes.alert}>Нужно здание с домом!</div>
        ) : null}
      </Modal>
    </>
  );
};
