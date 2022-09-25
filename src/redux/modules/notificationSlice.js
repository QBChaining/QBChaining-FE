// import { createSlice } from "@reduxjs/toolkit";
// import { notification } from "../../axios/api/notificationAPI";
// import { getNotificationDB, postNotificationDB } from "../async/notification";

// export const notificationSlice = createSlice({
//   name: "notification",
//   initialState: {
//     isFetching: false,
//     notification: [],
//   },
//   reducers: {},
//   extraReducers: {
//     // 알림 조회
//     [getNotificationDB.pending]: state => {
//       state.isFetching = true;
//     },
//     [getNotificationDB.fulfilled]: (state, action) => {
//       state.notification = action.payload;
//     },
//     //알림 확인
//     [postNotificationDB.pending]: state => {
//       state.isFetching = true;
//     },
//     [postNotificationDB.fulfilled]: (state, action) => {
//       state.notification = action;
//     },
//   },
// });

// export const {} = notificationSlice.actions;
// export default notificationSlice.reducer;
