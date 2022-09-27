import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../axios/api/notificationAPI";

// import { networkError } from "../../utils/swal";

// import * as Sentry from "@sentry/react";
// import { successAlert } from "../../utils/swal";

export const getNotificationDB = createAsyncThunk(
  "GET_NOTIFICATION",
  async thunkAPI => {
    try {
      const response = await notification.getNotification();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
);

export const postNotificationDB = createAsyncThunk(
  "POST_NOTIFICATION",
  async (id, thunkAPI) => {
    try {
      const response = await notification.postNotification(id);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
);
export const getTestDB = createAsyncThunk("GET_TEST", async thunkAPI => {
  const testNotifiRes = await new EventSource(
    "http://43.200.169.141/api/notification/test",
  );
  //   console.log("알람테스트", testNotifiRes);

  testNotifiRes.onmessage = function (event) {
    // 이벤트 설정이안된 기본 데이터 처리
  };
  testNotifiRes.addEventListener(
    "myevent",
    function (e) {
      // 'myevent' 이벤트의 데이터 처리
    },
    false,
  );
});
