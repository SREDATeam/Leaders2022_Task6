const path = require("path");
const fs = require("fs");

// https://gis-lab.info/qa/moscow-atd.html#.D0.9C.D1.83.D0.BD.D0.B8.D1.86.D0.B8.D0.BF.D0.B0.D0.BB.D1.8C.D0.BD.D1.8B.D0.B5_.D0.BE.D0.B1.D1.80.D0.B0.D0.B7.D0.BE.D0.B2.D0.B0.D0.BD.D0.B8.D1.8F

const districts = require("./mo.json");
const regions = require("./ao.json");

function coordinatesSwaper(list) {
  const newCoordList = [];

  list.forEach((listElem, index) => {
    if (Array.isArray(listElem)) {
      newCoordList.push(coordinatesSwaper(listElem));
    } else {
      newCoordList[list.length - 1 - index] = listElem;
    }
  });

  return newCoordList;
}

function constListNormalise(list) {
  const newList = [];

  list.forEach((listElem) => {
    listElem.length === 1 || listElem.length === 2
      ? newList.push(listElem[0])
      : newList.push(listElem);
  });

  return newList;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function districtsObjectManagerFileMaker(districts) {
  const file = {
    type: "FeatureCollection",
    features: [],
  };

  districts.features.forEach((districtsFeature) => {
    const coordinates = constListNormalise(
      coordinatesSwaper(districtsFeature.geometry.coordinates),
    );

    const district = {
      id: file.features.length,
      type: "Feature",
      properties: {
        districtName: districtsFeature.properties.NAME,
        regionName: districtsFeature.properties.NAME_AO,
        balloonContent:
          districtsFeature.properties.ABBREV_AO +
          " " +
          districtsFeature.properties.NAME,
      },
      options: {
        fillColor: "#ef4e4e",
        strokeColor: "#f81212",
        opacity: 0.3,
        strokeWidth: 2,
      },
      geometry: {
        type: "Polygon",
        coordinates: coordinates,
      },
    };

    file.features.push(district);
  });

  return file;
}

function regionsObjectManagerFileMaker(regions) {
  const file = {
    type: "FeatureCollection",
    features: [],
  };

  regions.features.forEach((regionsFeature) => {
    const coordinates = constListNormalise(
      coordinatesSwaper(regionsFeature.geometry.coordinates),
    );

    coordinates.forEach((coord) => {
      const region = {
        id: file.features.length,
        type: "Feature",
        properties: {
          regionName: regionsFeature.properties.NAME,
        },
        options: {
          strokeColor: "#f62e2e",
          strokeWidth: 2,
        },
        geometry: {
          type: "LineString",
          coordinates: coord,
        },
      };

      file.features.push(region);
    });
  });

  return file;
}

function districtsHeatFileMaker(districts) {
  const file = {
    type: "FeatureCollection",
    features: [],
  };

  districts.features.forEach((districtsFeature) => {
    const coordinates = constListNormalise(
      coordinatesSwaper(districtsFeature.geometry.coordinates),
    );

    coordinates.forEach((coord) => {
      coord.forEach((point) => {
        const newPoint = {
          id: file.features.length,
          type: "Feature",
          properties: {
            weight: Math.floor(Math.random() * 16),
            districtName: districtsFeature.properties.NAME,
            regionName: districtsFeature.properties.NAME_AO,
          },
          geometry: {
            type: "Point",
            coordinates: point,
          },
        };
        file.features.push(newPoint);
      });
    });
  });

  return file;
}

function districtsPointsFileMaker(districts) {
  const file = {
    type: "FeatureCollection",
    features: [],
  };

  const coordinates = constListNormalise(
    coordinatesSwaper(districts.features[0].geometry.coordinates),
  );
  for (let i = 0; i < 100; i++) {
    let color = getRandomColor();
    let newCircle = {
      id: file.features.length,
      type: "Feature",
      properties: {
        districtName: districts.features[0].properties.NAME,
        regionName: districts.features[0].properties.NAME_AO,
      },
      options: {
        fillColor: color,
        strokeColor: color,
        strokeWidth: 1,
      },
      geometry: {
        type: "Circle",
        coordinates: coordinates[0][i],
        radius: 5,
      },
    };

    file.features.push(newCircle);
  }

  return file;
}

const districtsMOD = JSON.stringify(
  districtsObjectManagerFileMaker(districts),
  null,
  2,
);
const regionsMOD = JSON.stringify(
  regionsObjectManagerFileMaker(regions),
  null,
  2,
);
const districtsHeat = JSON.stringify(
  districtsHeatFileMaker(districts),
  null,
  2,
);
const districtsCircles = JSON.stringify(
  districtsPointsFileMaker(districts),
  null,
  2,
);

fs.writeFile(
  path.resolve(__dirname, "./mo_modified.json"),
  districtsMOD,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The districtsMOD was saved!");
  },
);

fs.writeFile(
  path.resolve(__dirname, "./ao_modified.json"),
  regionsMOD,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The regionsMOD was saved!");
  },
);

fs.writeFile(
  path.resolve(__dirname, "./districts_heat.json"),
  districtsHeat,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The districtsHeat was saved!");
  },
);

fs.writeFile(
  path.resolve(__dirname, "./districts_circles.json"),
  districtsCircles,
  "utf8",
  function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The districtsCircles was saved!");
  },
);
