import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "../../utils/cookie";
import jwt_decode from "jwt-decode";
import {
  postUserInfoDB,
  putUserInNewDB,
  getUserInfoDB,
  getUserInfoActivityDB,
  getUserQnaListDB,
  getUserBlogListDB,
} from "../async/user";

interface IUser {
  userName: string;
  profileImg: string;
  isNew: string;
}

export interface TUserSlice {
  userInfo: {
    profileImg: string;
    userName: string;
    age?: string;
    career?: string;
    gender?: string;
    job?: string;
    languages?: string[];
  };
  userQnaList: {
    id: number;
    title: string;
    createdAt: string;
    isResolve: boolean;
  }[];
  userQnaAnswerList: {
    id: number;
    Qna: { id: number; title: string; createdAt: string; isResolve: boolean };
  }[];
  userBlogList: {
    id: number;
    title: string;
    createdAt: string;
    likes: number;
  }[];
  userBlogCommentList: {
    id: number;
    Post: { id: number; title: string; createdAt: string; likes: number };
  }[];
  isLogin: boolean;
  userToken: string | null;
  userName: string | null;
  userProfile: string | null;
  userIsNew: null | string;
  isFetching: boolean;
  userActivity: [];
  errorMessage: null;
  color: string;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userQnaList: [],
    userQnaAnswerList: [],
    userBlogList: [],
    userBlogCommentList: [],
    isLogin: false,
    userToken: null,
    userName: null,
    userProfile: null,
    userInfo: {},
    userIsNew: null,
    isFetching: false,
    userActivity: [],
    errorMessage: null,
    color: "backgroundGradient",
  } as TUserSlice,
  reducers: {
    logOut: state => {
      deleteCookie("token");
      state.isLogin = false;
      state.userToken = null;
      state.userName = null;
      state.userProfile = null;
      state.userIsNew = null;
    },
    logIn: state => {
      state.isLogin = true;
      state.userToken = getCookie("token");
      state.userName = jwt_decode<IUser>(getCookie("token")).userName;
      state.userProfile = jwt_decode<IUser>(getCookie("token")).profileImg;
      state.userIsNew = jwt_decode<IUser>(getCookie("token")).isNew;
    },
    colorSetGreen: state => {
      state.color = "mainGreen";
    },
    colorSetBlue: state => {
      state.color = "mainBlue";
    },
    colorSetGrad: state => {
      state.color = "backgroundGradient";
    },
    removeUserInfo: state => {
      state.userQnaList = [];
      state.userQnaAnswerList = [];
      state.userBlogList = [];
      state.userBlogCommentList = [];
      state.userActivity = [];
    },
  },
  extraReducers: {
    [postUserInfoDB.fulfilled.type]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postUserInfoDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postUserInfoDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //신규회원인지 확인
    [putUserInNewDB.fulfilled.type]: (state, { payload }) => {
      state.userIsNew = "false";
      state.isFetching = false;
      state.errorMessage = null;
    },
    [putUserInNewDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [putUserInNewDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원정보 받아오기
    [getUserInfoDB.fulfilled.type]: (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserInfoDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserInfoDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원활동내역 받아오기
    [getUserInfoActivityDB.fulfilled.type]: (state, { payload }) => {
      state.userActivity = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserInfoActivityDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserInfoActivityDB.rejected.type]: (
      state,
      { payload: errorMessage },
    ) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원QnaList 받아오기
    [getUserQnaListDB.fulfilled.type]: (state, { payload }) => {
      state.userQnaList = payload.myQna;
      state.userQnaAnswerList = payload.myAnswer;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원BlogList 받아오기
    [getUserBlogListDB.fulfilled.type]: (state, { payload }) => {
      state.userBlogList = payload.post;
      state.userBlogCommentList = payload.comment;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const {
  logOut,
  logIn,
  colorSetGreen,
  colorSetBlue,
  colorSetGrad,
  removeUserInfo,
} = userSlice.actions;
export default userSlice.reducer;
