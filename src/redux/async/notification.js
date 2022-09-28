import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../axios/api/notificationAPI";

export const getNotificationDB = createAsyncThunk(
  "GET_NOTIFICATION",
  async thunkAPI => {
    try {
      const response = await notification.getNotification();
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const postNotificationDB = createAsyncThunk(
  "POST_NOTIFICATION",
  async (id, data, thunkAPI) => {
    console.log("payload", id);
    console.log(data);
    try {
      const response = await notification.postNotification(id);
      console.log("리스폰", response);
      console.log(id);
      return id;
    } catch (err) {
      console.log(err);
    }
  },
);
export const delNotificationDB = createAsyncThunk(
  "DEL_NOTIFICATION",
  async (id, thunkAPI) => {
    try {
      const response = await notification.deleteNotification(id);
      return id;
    } catch (err) {}
  },
);

// export const getTestDB = createAsyncThunk("GET_TEST", async thunkAPI => {
//   const testNotifiRes = await new EventSource(
//     "http://43.200.169.141/api/notification/test",
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
