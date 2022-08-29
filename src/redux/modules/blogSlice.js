import {createSlice} from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {
    increment: (state) => {},
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
