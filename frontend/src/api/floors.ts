import axios from "axios";

const baseUrl = "http://134.0.118.112:8000";

export const loadExcel = (file) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/input/excel",
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    data: file,
  };
  return axios(options);
};

export const calcLoad = (data) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/calculate",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return axios(options);
};

export const predict = (data) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/predict",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return axios(options);
};
