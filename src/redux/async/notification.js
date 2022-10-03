import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../axios/api/notificationAPI";
import { errorAlert, networkError } from "./../../utils/swal";
import * as Sentry from "@sentry/react";

export const getNotificationDB = createAsyncThunk(
  "GET_NOTIFICATION",
  async thunkAPI => {
    try {
      const response = await notification.getNotification();
      return response.data.data;
    } catch (err) {
      if (err.response.status === 404) {
        networkError();
      }
      if (err.response.status === 419) {
        errorAlert("토큰이 만료되었습니다", "재로그인이 필요합니다!");
      }
      Sentry.captureException(`error, 알람리스트 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const postNotificationDB = createAsyncThunk(
  "POST_NOTIFICATION",
  async (id, data, thunkAPI) => {
    try {
      const response = await notification.postNotification(id);
      return id;
    } catch (err) {
      if (err.response.status === 404) {
        networkError();
      }
      if (err.response.status === 419) {
        errorAlert("토큰이 만료되었습니다", "재로그인이 필요합니다!");
      }
      Sentry.captureException(`error, 알람 확인 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
export const delNotificationDB = createAsyncThunk(
  "DEL_NOTIFICATION",
  async (id, thunkAPI) => {
    try {
      const response = await notification.deleteNotification(id);
      return id;
    } catch (err) {
      if (err.response.status === 404) {
        networkError();
      }
      if (err.response.status === 419) {
        errorAlert("토큰이 만료되었습니다", "재로그인이 필요합니다!");
      }
      Sentry.captureException(`error, 알람 삭제 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
//sse test
// export const getTestDB = createAsyncThunk("GET_TEST", async thunkAPI => {
//   const testNotifiRes = await new EventSource(
//   );
//   //   console.log("알람테스트", testNotifiRes);

//   testNotifiRes.onmessage = function (event) {
//     // 이벤트 설정이안된 기본 데이터 처리
//   };
//   testNotifiRes.addEventListener(
//     "myevent",
//     function (e) {
//       // 'myevent' 이벤트의 데이터 처리
//     },
//     false,
//   );
// });
