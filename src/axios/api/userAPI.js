import instance from "../axios";

export const userApi = {
  //회원가입 후 유저정보 입력
  postUserInfo: data => instance.post("/auth/user/info", data),

  //회원가입 후 isNew를 true로 바꾸는 api
  putUserInNew: () => instance.put("/auth/user/isnew"),

  //유저정보 가져오기
  getUserInfo: () => instance.get("/auth/user/page"),

  //유저활동기록 가져오기
  getUserInfoActivity: () => instance.get("/auth/user/activity"),
};
