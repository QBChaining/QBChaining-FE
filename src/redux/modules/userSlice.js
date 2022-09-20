import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "./../../utils/cookie";
import jwt_decode from "jwt-decode";

import { postUserInfoDB } from "../async/user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userToken: null,
    userName: null,
    userProfile: null,
    color: "backgroundGradient",
  },
  reducers: {
    logOut: (state, action) => {
      deleteCookie("token");
      state.isLogin = false;
      state.userToken = null;
      state.userName = null;
      state.userProfile = null;
    },
    logIn: (state, action) => {
      state.isLogin = true;
      state.userToken = getCookie("token");
      state.userName = jwt_decode(getCookie("token")).userName;
      state.userProfile = jwt_decode(getCookie("token")).profileImg;
    },
    colorSetGreen: (state, action) => {
      state.color = "mainGreen";
    },
    colorSetBlue: (state, action) => {
      state.color = "mainBlue";
    },
    colorSetGrad: (state, action) => {
      state.color = "backgroundGradient";
    },
  },
  extraReducers: {
    [postUserInfoDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postUserInfoDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postUserInfoDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const { logOut, logIn, colorSetGreen, colorSetBlue, colorSetGrad } =
  userSlice.actions;
export default userSlice.reducer;
