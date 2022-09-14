import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";
// import commentSlice from '../modules/commentSlice'
import userSlice from "./../modules/userSlice";
import { searchSlice } from "./../modules/searchSlice";

const store = configureStore({
  reducer: {
    qnaSlice,
    blogSlice,
    userSlice,
    searchSlice,
  },
});

export default store;
