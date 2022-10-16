import Cookies from "universal-cookie";

const cookies = new Cookies();

//쿠키저장
export const setCookie = (name: string, value: string, option: any) => {
  return cookies.set(name, value, { ...option });
};

//쿠키 호출
export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const deleteCookie = (name: string) => {
  return cookies.remove(name);
};
