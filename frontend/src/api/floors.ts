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

export const getArchive = () => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/get_all_solutions_data",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(options);
};

export const getExel = (id) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/get_excel",
    headers: {
      "Content-Type": "blob",
    },
    params: { id },
    responseType: "blob",
  };
  return axios(options)
    .then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(new Blob([response.data]));

      // create "a" HTML element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", `file-${id}.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
    .catch((err) => {
      console.error(err);
    });
};
