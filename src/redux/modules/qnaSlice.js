import { createSlice } from "@reduxjs/toolkit";
import {
  getQnaListDB,
  getOneQnaListDB,
  postQnaListDB,
  editQnaListDB,
  getCommentListDB,
  postCommentListDB,
  deleteCommentListDB,
  editCommentListDB,
} from "../async/qna";

const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    qnaList: [],
    qnaTarget: {},
    commentList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getQnaListDB.fulfilled]: (state, { payload }) => {
      state.qnaList = payload;
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

    [getOneQnaListDB.fulfilled]: (state, { payload }) => {
      state.qnaTarget = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getOneQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getOneQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [postQnaListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [editQnaListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [getCommentListDB.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [postCommentListDB.fulfilled]: (state, { payload }) => {
      state.commentList.push(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [deleteCommentListDB.fulfilled]: (state, { payload }) => {
      const newCommentList = state.commentList.filter(
        data => data.id !== payload,
      );
      state.commentList = newCommentList;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [deleteCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    [editCommentListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});
export const {} = qnaSlice.actions;
export default qnaSlice.reducer;
