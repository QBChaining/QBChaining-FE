import {createSlice} from "@reduxjs/toolkit";
import {getBlogCommunityListDB} from "../async/blog";
export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getBlogCommunityListDB.fulfilled]: (state, {payload}) => {
      console.log(payload);
      state.blogList = payload;
      state.isFetching = false;
      state.errorMessage = null;
      console.log("ffe");
    },
    [getBlogCommunityListDB.pending]: (state, {payload}) => {
      console.log(payload);
      state.isFetching = true;
    },
    [getBlogCommunityListDB.rejected]: (state, {payload: errorMessage}) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
