import { configureStore } from "@reduxjs/toolkit";
import qnaSlice from "../modules/qnaSlice";
import blogSlice from "../modules/blogSlice";
import userSlice from "../modules/userSlice";
import searchSlice from "../modules/searchSlice";
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

// useSelector 사용시 타입으로 사용하기 위함
export type RootState = ReturnType<typeof store.getState>;

// useDispatch를 좀 더 명확하게 사용하기 위함
export type AppDispatch = typeof store.dispatch;

export default store;
