import {createSlice} from "@reduxjs/toolkit";
import {
  getQnaListDB,
  getOneQnaListDB,
  postQnaListDB,
  editQnaListDB,
} from "../async/qna";

const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    qnaList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getQnaListDB.fulfilled]: (state, {payload}) => {
      console.log(payload);
      state.qnaList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaListDB.pending]: (state, {payload}) => {
      state.isFetching = true;
    },
    [getQnaListDB.rejected]: (state, {payload: errorMessage}) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [getOneQnaListDB.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getOneQnaListDB.pending]: (state, {payload}) => {
      state.isFetching = true;
    },
    [getOneQnaListDB.rejected]: (state, {payload: errorMessage}) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [postQnaListDB.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postQnaListDB.pending]: (state, {payload}) => {
      state.isFetching = true;
    },
    [postQnaListDB.rejected]: (state, {payload: errorMessage}) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [editQnaListDB.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editQnaListDB.pending]: (state, {payload}) => {
      state.isFetching = true;
    },
    [editQnaListDB.rejected]: (state, {payload: errorMessage}) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});
export const {} = qnaSlice.actions;
export default qnaSlice.reducer;
