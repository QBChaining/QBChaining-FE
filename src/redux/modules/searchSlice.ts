import { createSlice } from "@reduxjs/toolkit";
import { getQnaSearchListDB, getBlogSearchListDB } from "../async/search";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    qnaSearchList: [],
    blogSearchList: [],
    searchWord: "",
    errorMessage: null,
    isFetching: false,
  },
  reducers: {
    removeSearchList: (state, { payload }) => {
      state.qnaSearchList = [];
      state.blogSearchList = [];
      state.searchWord = "";
    },
    setSearchWord: (state, { payload }) => {
      state.searchWord = payload;
    },
  },
  extraReducers: {
    //qna검색결과 조회
    [getQnaSearchListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaSearchListDB.fulfilled.type]: (state, { payload }) => {
      state.qnaSearchList = state.qnaSearchList.concat(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaSearchListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //블로그 검색결과 조회
    [getBlogSearchListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getBlogSearchListDB.fulfilled.type]: (state, { payload }) => {
      state.blogSearchList = state.blogSearchList.concat(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogSearchListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const { removeSearchList, setSearchWord } = searchSlice.actions;
export default searchSlice.reducer;
