import instance from "../axios";

export const notification = {
  //알람 조회
  getNotification: () => instance.get("/notification"),
  //알람 확인
  postNotification: id => instance.post(`/notification/${id}`),
};
