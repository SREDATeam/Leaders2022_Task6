import axios from "axios";

const baseUrl = "http://134.0.118.112:8000";

export const loginUser = (data: { login: string; password: string }) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return axios(options);
};

export const registerUser = (data: {
  login: string;
  password: string;
  first_name: string;
  last_name: string;
  patronymic: string;
}) => {
  const options = {
    method: "POST",
    url: baseUrl + "/api/add_user",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  return axios(options);
};
