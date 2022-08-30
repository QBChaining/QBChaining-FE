import {configureStore} from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";

const store = configureStore({
  reducer: {
    qnaSlice,
    blogSlice,
  },
});

export default store;
