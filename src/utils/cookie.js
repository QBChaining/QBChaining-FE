import Cookies from "universal-cookie";

const cookies = new Cookies();

//쿠키저장
export const setCookie = (name, value, option) => {
  return cookies.set(name, value, { ...option });
};

//쿠키 호출
export const getCookie = name => {
  return cookies.get(name);
};
