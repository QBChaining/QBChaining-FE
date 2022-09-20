import instance from "../axios";

export const userApi = {
  postUserInfo: data => instance.post("/auth/user/info", data),
};
