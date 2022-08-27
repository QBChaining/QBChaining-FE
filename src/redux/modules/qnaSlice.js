import { createSlice } from "@reduxjs/toolkit";
import { getQnaListDB } from "../async/qna";

const initialState = { list: [], isFetching: false, errorMessage: "" };

const qnaSlice = createSlice({
  name: "qna",
  initialState,
  reducers: {},
  extraReduers: {
    [getQnaListDB.fulfilled]: (state, { payload }) => {
      state.list = payload.result.rows;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export default qnaSlice;
