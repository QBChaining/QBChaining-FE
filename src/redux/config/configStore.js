import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";
import userSlice from "./../modules/userSlice";
import searchSlice from "./../modules/searchSlice";
import notificationSlice from "../modules/notificationSlice";

const store = configureStore({
  reducer: {
    qnaSlice,
    blogSlice,
    userSlice,
    searchSlice,
    notificationSlice,
  },
});

export default store;
