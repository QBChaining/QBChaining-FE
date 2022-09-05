import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";
// import commentSlice from '../modules/commentSlice'
import userSlice from "./../modules/userSlice";

const store = configureStore({
  reducer: {
    qnaSlice,
    blogSlice,
    userSlice,
    // commentSlice
  },
});

export default store;
