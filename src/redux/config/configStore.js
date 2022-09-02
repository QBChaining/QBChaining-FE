import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";
// import commentSlice from '../modules/commentSlice'

const store = configureStore({
  reducer: {
    qnaSlice,
    blogSlice,
    // commentSlice
  },
});

export default store;
