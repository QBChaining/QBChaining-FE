import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../axios/api/notificationAPI";
import { errorAlert, networkError } from "../../utils/swal";
import * as Sentry from "@sentry/react";

/**
 * 알림 리스트 조회
 */
export const getNotificationDB = createAsyncThunk(
  "GET_NOTIFICATION",
  async (data, thunkAPI) => {
    try {
      const response = await notification.getNotification();
      return response.data.data;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }

      Sentry.captureException(`error, 알람리스트 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

/**
 * 알림 확인
 */
export const postNotificationDB = createAsyncThunk(
  "POST_NOTIFICATION",
  async (id: number, thunkAPI) => {
    try {
      const response = await notification.postNotification(id);
      return id;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      if (err.response.status === 419) {
        errorAlert("토큰이 만료되었습니다.", "재로그인이 필요합니다!");
      }
      Sentry.captureException(`error, 알람 확인 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

/**
 * 알람 삭제
 */
export const delNotificationDB = createAsyncThunk(
  "DEL_NOTIFICATION",
  async (id: number, thunkAPI) => {
    try {
      const response = await notification.deleteNotification(id);
      return id;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      if (err.response.status === 419) {
        errorAlert("토큰이 만료되었습니다.", "재로그인이 필요합니다!");
      }
      Sentry.captureException(`error, 알람 삭제 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
