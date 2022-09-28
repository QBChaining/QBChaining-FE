import { createSlice } from "@reduxjs/toolkit";
import {
  getNotificationDB,
  postNotificationDB,
  delNotificationDB,
} from "../async/notification";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    isFetching: false,
    notification: [],
  },
  reducers: {},
  extraReducers: {
    // 알림 조회
    [getNotificationDB.pending]: state => {
      state.isFetching = true;
    },
    [getNotificationDB.fulfilled]: (state, action) => {
      state.notification = action.payload;
    },
    //알림 확인
    [postNotificationDB.pending]: (state, action) => {
      state.isFetching = true;
    },
    [postNotificationDB.fulfilled]: (state, action) => {
      const idx = state.notification.findIndex(data => {
        return data.id === action;
      });
      state.notification[idx] = true;
    },
    //알림 삭제
    [delNotificationDB.pending]: state => {
      state.isFetching = true;
    },
    [delNotificationDB.fulfilled]: (state, action) => {
      const index = state.notification.filter(data => {
        return data.id !== action;
      });
      state.notification = index;
    },
  },
});

export const {} = notificationSlice.actions;
export default notificationSlice.reducer;
