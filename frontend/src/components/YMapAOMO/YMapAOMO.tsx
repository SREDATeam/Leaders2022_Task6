import { useEffect } from "react";
import Papa from "papaparse";

import districts from "../../mock/mo_modified.json";
import districtsHeat from "../../mock/districts_heat.json";
import districtsPoints from "../../mock/districts_circles.json";
import regions from "../../mock/ao_modified.json";

import classes from "./YMapAOMO.module.scss";
import { Input } from "antd";

const regionsMainFilter = districts.features.reduce((reducer, feature) => {
  if (!reducer[feature.properties.regionName]) {
    reducer[feature.properties.regionName] = {};
  }
  reducer[feature.properties.regionName] = false;
  return reducer;
}, {});

const districtsMainFilter = districts.features.reduce((reducer, feature) => {
  if (!reducer[feature.properties.regionName]) {
    reducer[feature.properties.regionName] = {};
  }
  reducer[feature.properties.regionName][feature.properties.districtName] =
    false;
  return reducer;
}, {});

function getRegionsFilterFunction(filter, regionsState, districtsState) {
  return function filterFiatusers(feature) {
    if (districtsState && !regionsState) {
      return false;
    }
    if (!regionsState) {
      return true;
    } else {
      return regionsMainFilter[feature.properties.regionName];
    }
  };
}

function getRegionsFilterState() {
  let state = false;
  for (let key of Object.keys(regionsMainFilter)) {
    state = state || regionsMainFilter[key];
  }
  return state;
}

function getDistrictsFilterFunction(filter, regionsState, districtsState) {
  return function filterFiatusers(feature) {
    if (regionsState && !regionsMainFilter[feature.properties.regionName]) {
      return false;
    }
    if (!districtsState) {
      return true;
    } else {
      return districtsMainFilter[feature.properties.regionName][
        feature.properties.districtName
      ];
    }
  };
}

function getDistrictsFilterState() {
  let state = false;
  for (let regionName of Object.keys(districtsMainFilter)) {
    for (let key of Object.keys(districtsMainFilter[regionName])) {
      state = state || districtsMainFilter[regionName][key];
    }
  }
  return state;
}

function districtsListInit(districts, regionsManager, districtsManager) {
  const regionsState = getRegionsFilterState();
  const districtsListItems = districts.features
    .reduce((reducer, feature) => {
      const isNeeded =
        !reducer.includes(feature.properties.districtName) &&
        getDistrictsFilterFunction(null, regionsState, false)(feature);
      if (isNeeded) {
        reducer.push([
          feature.properties.districtName,
          feature.properties.regionName,
        ]);
      }
      return reducer;
    }, [])
    .map(
      ([name, regionName]) =>
        new ymaps.control.ListBoxItem({
          data: {
            content: name,
            regionName,
            show: true,
          },
          state: {
            selected: false,
          },
        }),
    );

  const districtsList = new ymaps.control.ListBox({
    data: {
      content: "Выберите район",
    },
    options: {
      position: {
        left: 160,
        top: 10,
      },
    },
    items: districtsListItems,
    filters: districtsListItems.reduce(function (filters, listItem) {
      filters[listItem.data.get("content")] = listItem.isSelected();
      return filters;
    }, {}),
  });

  const districtsMonitor = new ymaps.Monitor(districtsList.state);

  districtsMonitor.add("filters", function (filters) {
    let regionsState = getRegionsFilterState();
    let districtsState = getDistrictsFilterState();
    regionsManager.setFilter(
      getRegionsFilterFunction(filters, regionsState, districtsState),
    );

    regionsState = getRegionsFilterState();
    districtsState = getDistrictsFilterState();
    districtsManager.setFilter(
      getDistrictsFilterFunction(filters, regionsState, districtsState),
    );

    setTimeout(() => {
      districtsManager.getMap().setBounds(districtsManager.getBounds());
    }, 0);
  });

  const districtsListEvents = districtsList.events
    .group()
    .add(["select", "deselect"], function (event) {
      const listBoxItem = event.get("target");
      const districtsFilters = ymaps.util.extend(
        {},
        districtsList.state.get("filters"),
      );

      districtsMainFilter[listBoxItem.data.get("regionName")][
        listBoxItem.data.get("content")
      ] = listBoxItem.isSelected();
      districtsFilters[listBoxItem.data.get("content")] =
        listBoxItem.isSelected();
      districtsList.state.set("filters", districtsFilters);
    });

  function districtsListRemove(map) {
    districtsListEvents.removeAll();
    districtsMonitor.removeAll();
    map.controls.remove(districtsList);
  }

  return { districtsList, districtsListRemove };
}

function districtsPointsFileMaker(fileData) {
  const file = {
    type: "FeatureCollection",
    features: [],
  };

  for (let i = 0; i < 1000; i++) {
    let newCircle = {
      id: file.features.length,
      type: "Feature",
      options: {
        fillColor: "#000000",
        strokeColor: "#000000",
        strokeWidth: 3,
      },
      geometry: {
        type: "Circle",
        coordinates: [+fileData[i].lat, +fileData[i].lng],
        radius: 7,
      },
    };

    file.features.push(newCircle);
  }

  return file;
}

let createHeatmap = null;

ymaps.modules.require(["Heatmap"], function (Heatmap) {
  createHeatmap = (points) => {
    const heatmap = new Heatmap(points, {
      radius: 14,
      opasity: 0.6,
      dissipating: true,
      intensityOfMidpoint: 0.1,
    });
    return heatmap;
  };
});

export const YMapAOMO: React.FC = () => {
  let myMap = null;

  function init() {
    myMap = new ymaps.Map(
      "map",
      {
        center: [55.63, 37.45],
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

    const togleHeat = new ymaps.control.Button({
      data: {
        content: "Тепловая карта",
      },
      options: {
        selectOnClick: true,
        position: {
          left: 315,
          top: 10,
        },
        maxWidth: 150,
      },
    });

    const togleIndex = new ymaps.control.Button({
      data: {
        content: "Индексы рынка",
      },
      state: {
        selected: false,
      },
      options: {
        selectOnClick: true,
        position: {
          left: 455,
          top: 10,
        },
        maxWidth: 150,
      },
    });

    let heatmap = createHeatmap({
      type: "FeatureCollection",
      features: districtsHeat.features.filter(
        getDistrictsFilterFunction(null, false, getDistrictsFilterState()),
      ),
    });

    togleHeat.events.add("click", function () {
      heatmap.getMap(myMap) === myMap
        ? heatmap.setMap(null)
        : heatmap.setMap(myMap);
    });

    const regionsListItems = regions.features
      .reduce((reducer, feature) => {
        if (!reducer.includes(feature.properties.regionName)) {
          reducer.push(feature.properties.regionName);
        }
        return reducer;
      }, [])
      .map(
        (name) =>
          new ymaps.control.ListBoxItem({
            data: {
              content: name,
            },
            state: {
              selected: false,
            },
          }),
      );

    const regionsManager = new ymaps.ObjectManager();
    const districtsManager = new ymaps.ObjectManager();
    const indexesManager = new ymaps.ObjectManager({
      // clusterize: true,
      // gridSize: 32,
      // clusterDisableClickZoom: true,
    });

    const regionsList = new ymaps.control.ListBox({
      data: {
        content: "Выберите округ",
      },
      options: {
        position: {
          left: 10,
          top: 10,
        },
      },
      items: regionsListItems,
      filters: regionsListItems.reduce(function (filters, listItem) {
        filters[listItem.data.get("content")] = listItem.isSelected();
        return filters;
      }, {}),
    });

    let districtsListWrap = districtsListInit(
      districts,
      regionsManager,
      districtsManager,
    );

    const regionsMonitor = new ymaps.Monitor(regionsList.state);
    const togleIndexMonitor = new ymaps.Monitor(togleIndex.state);

    regionsList.events.add(["select", "deselect"], function (event) {
      const listBoxItem = event.get("target");
      const filters = ymaps.util.extend({}, regionsList.state.get("filters"));

      regionsMainFilter[listBoxItem.data.get("content")] =
        listBoxItem.isSelected();
      filters[listBoxItem.data.get("content")] = listBoxItem.isSelected();

      regionsList.state.set("filters", filters);
    });

    regionsManager.add(regions);
    districtsManager.add(districts);

    regionsMonitor.add("filters", function (filters) {
      for (let regionName of Object.keys(districtsMainFilter)) {
        for (let key of Object.keys(districtsMainFilter[regionName])) {
          districtsMainFilter[regionName][key] = false;
        }
      }

      let regionsState = getRegionsFilterState();
      regionsManager.setFilter(
        getRegionsFilterFunction(filters, regionsState, false),
      );

      regionsState = getRegionsFilterState();
      districtsManager.setFilter(
        getDistrictsFilterFunction(filters, regionsState, false),
      );

      districtsListWrap.districtsListRemove(myMap);
      districtsListWrap = districtsListInit(
        districts,
        regionsManager,
        districtsManager,
      );
      myMap.controls.add(districtsListWrap.districtsList);

      setTimeout(() => {
        myMap.setBounds(regionsManager.getBounds());
      }, 0);
    });

    togleIndexMonitor.add("selected", function (selected) {
      console.log(indexesManager.objects.getAll().length);

      if (!indexesManager.objects.getAll().length) {
        const file = document.getElementById("csvfile");

        if (file.files.length) {
          Papa.parse(file.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
              console.log("parsed");
              indexesManager.add(districtsPointsFileMaker(results.data));
            },
          });
        }
      }
      indexesManager.setFilter(() => selected);
    });

    myMap.geoObjects
      .add(districtsManager)
      .add(regionsManager)
      .add(indexesManager);

    myMap.controls
      .add(districtsListWrap.districtsList)
      .add(typeControl)
      .add(zoomControl)
      .add(regionsList)
      .add(togleIndex)
      .add(togleHeat);
  }

  useEffect(() => {
    ymaps.ready(init);

    return () => {
      myMap.destroy();
    };
  }, []);

  return (
    <div className={classes.container}>
      <div id="map" className={classes.map}>
        {/* <Input type="file" name="file" id="csvfile" accept=".csv" /> */}
      </div>
    </div>
  );
};
