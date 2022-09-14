import { createSlice } from "@reduxjs/toolkit";
import { getQnaSearchListDB, getBlogSearchListDB } from "./../async/search";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    qnaSearchList: [],
    blogSearchList: [],
  },
  reducers: {},
  extraReducers: {
    //qna검색결과 조회
    [getQnaSearchListDB.pending]: state => {
      state.isFetching = true;
    },
    [getQnaSearchListDB.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.qnaSearchList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaSearchListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 검색결과 조회
    [getBlogSearchListDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogSearchListDB.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.blogSearchList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogSearchListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
