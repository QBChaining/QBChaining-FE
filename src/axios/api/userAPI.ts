import instance from "../axios";

export const userApi = {
  //회원가입 후 유저정보 입력
  postUserInfo: (data: any) => instance.post("/auth/user/info", data),

  //유저정보 수정
  putUserInfo: (data: any) => instance.put("/auth/user/info", data),

  //회원가입 후 isNew를 true로 바꾸는 api
  putUserInNew: () => instance.put("/auth/user/isnew"),

  //유저정보 가져오기
  getUserInfo: (userName: string) =>
    instance.get(`/auth/user/page/${userName}`),

  //유저활동기록 가져오기
  getUserInfoActivity: (userName: string) =>
    instance.get(`/auth/user/activity/${userName}`),

  getUserQnaList: (userName: string) => instance.get(`/qna/users/${userName}`),
  getUserBlogList: (userName: string) =>
    instance.get(`/posts/users/${userName}`),
};
