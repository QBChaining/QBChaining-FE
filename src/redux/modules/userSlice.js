import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "./../../utils/cookie";
import jwt_decode from "jwt-decode";
import {
  postUserInfoDB,
  putUserInNewDB,
  getUserInfoDB,
  getUserInfoActivityDB,
  getUserQnaListDB,
  getUserBlogListDB,
} from "../async/user";

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
  },
  reducers: {
    logOut: (state, action) => {
      deleteCookie("token");
      state.isLogin = false;
      state.userToken = null;
      state.userName = null;
      state.userProfile = null;
      state.userIsNew = null;
    },
    logIn: (state, action) => {
      state.isLogin = true;
      state.userToken = getCookie("token");
      state.userName = jwt_decode(getCookie("token")).userName;
      state.userProfile = jwt_decode(getCookie("token")).profileImg;
      state.userIsNew = jwt_decode(getCookie("token")).isNew;
    },
    colorSetGreen: (state, action) => {
      state.color = "mainGreen";
    },
    colorSetBlue: (state, action) => {
      state.color = "mainBlue";
    },
    colorSetGrad: (state, action) => {
      state.color = "backgroundGradient";
    },
    removeUserInfo: (state, action) => {
      state.userQnaList = [];
      state.userQnaAnswerList = [];
      state.userBlogList = [];
      state.userBlogCommentList = [];
      state.userActivity = [];
    },
  },
  extraReducers: {
    [postUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postUserInfoDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postUserInfoDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //신규회원인지 확인
    [putUserInNewDB.fulfilled]: (state, { payload }) => {
      state.userIsNew = false;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [putUserInNewDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [putUserInNewDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원정보 받아오기
    [getUserInfoDB.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserInfoDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserInfoDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원활동내역 받아오기
    [getUserInfoActivityDB.fulfilled]: (state, { payload }) => {
      state.userActivity = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserInfoActivityDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserInfoActivityDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원QnaList 받아오기
    [getUserQnaListDB.fulfilled]: (state, { payload }) => {
      state.userQnaList = payload.myQna;
      state.userQnaAnswerList = payload.myAnswer;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //회원BlogList 받아오기
    [getUserBlogListDB.fulfilled]: (state, { payload }) => {
      state.userBlogList = payload.post;
      state.userBlogCommentList = payload.comment;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getUserQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getUserQnaListDB.rejected]: (state, { payload: errorMessage }) => {
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
