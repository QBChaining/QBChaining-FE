import axios from "axios";
import { getCookie } from "../utils/cookie";
import { errorAlert, networkError } from "../utils/swal";

const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

instance.interceptors.request.use(config => {
  if (getCookie("token")) {
    config.headers["Authorization"] = "Bearer " + getCookie("token");
  }
  return config;
});

instance.interceptors.response.use(
  res => {},
  err => {
    if (err.response.data.code === 419) {
      errorAlert("재로그인이 필요합니다!", "토큰이 만료되었습니다.");
    }
  },
);

export default instance;
