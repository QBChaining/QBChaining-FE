import axios from "axios";
import Cookies from "universal-cookie";
import { getCookie } from "../utils/cookie";
const instance = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});
instance.interceptors.request.use(config => {
  // 세션쿠키 있을때 활성화
  // if (getCookie("session")) {
  //   config.headers["Cookie"] = "session=" + getCookie("session");
  // }
  return config;
});

export default instance;
