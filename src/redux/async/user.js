import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "./../../axios/api/userAPI";

//alert
import { errorLikeAlert, networkError, successAlert } from "../../utils/swal";

//error loging
import * as Sentry from "@sentry/react";

//회원가입 후 유저정보 입력
export const postUserInfoDB = createAsyncThunk(
  "auth/postuserinfo",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.postUserInfo(data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      console.log(err);
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//유저정보 수정
export const putUserInfoDB = createAsyncThunk(
  "auth/putuserinfo",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.putUserInfo(data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//isnew 바꾸기
export const putUserInNewDB = createAsyncThunk(
  "auth/putuserisnew",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.putUserInNew();
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 신규회원인지 확인 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//유저정보 받아오기
export const getUserInfoDB = createAsyncThunk(
  "auth/getuserinfo",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.getUserInfo(data);
      if (response.data.success === "ok") {
        return response.data.userPageInfo;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//유저활동기록 받아오기
export const getUserInfoActivityDB = createAsyncThunk(
  "auth/getuserinfoactivity",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.getUserInfoActivity(data);
      if (response.statusText === "OK") {
        return response.data.userActivity;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const getUserQnaListDB = createAsyncThunk(
  "auth/getuserqnalist",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.getUserQnaList(data);
      console.log("UserQnaList", response.data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const getUserBlogListDB = createAsyncThunk(
  "auth/getuserbloglist",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.getUserBlogList(data);
      console.log("UserBlogList", response.data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
