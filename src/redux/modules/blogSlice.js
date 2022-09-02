import { createSlice } from "@reduxjs/toolkit";
import {
  getBlogCommunityListDB,
  postBlogCommunityDB,
  getBlogCommentListDB,
  postBlogCommentDB,
  patchBlogCommentDB,
  deleteBlogCommentDB,
} from "../async/blog";
export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    commentList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    //블로그 조회 부분
    [getBlogCommunityListDB.fulfilled]: (state, action) => {
      state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },

    [getBlogCommunityListDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogCommunityListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 생성 부분
    [postBlogCommunityDB.fulfilled]: (state, action) => {
      state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },

    [postBlogCommunityDB.pending]: state => {
      state.isFetching = true;
    },
    [postBlogCommunityDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //댓글 조회 부분
    [getBlogCommentListDB.fulfilled]: (state, action) => {
      state.commentList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogCommentListDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogCommentListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    //댓글 추가 부분
    [postBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [postBlogCommentDB.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = null;
      state.commentList = action.meta.arg;
    },
    [postBlogCommentDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //댓글 수정 부분
    [patchBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [patchBlogCommentDB.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = null;
      state.commentList = action.meta.arg;
    },
    [patchBlogCommentDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //댓글 삭제 부분
    [deleteBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [deleteBlogCommentDB.fulfilled]: (state, action) => {
      console.log("액션", action);
      state.isFetching = false;
      state.errorMessage = null;
      state.commentList = action.meta.arg;
    },
    [deleteBlogCommentDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
