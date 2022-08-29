import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "./../modules/qnaSlice";

const store = configureStore({
  reducer: {
    qnaSlice,
  },
});

export default store;
