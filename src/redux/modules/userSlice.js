import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "./../../utils/cookie";
import jwt_decode from "jwt-decode";

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
    },
    logIn: (state, action) => {
      state.isLogin = true;
      state.userToken = getCookie("token");
      state.userName = jwt_decode(getCookie("token")).name;
      state.userProfile = jwt_decode(getCookie("token")).profile_img;
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
});

export const { logOut, logIn, colorSetGreen, colorSetBlue, colorSetGrad } =
  userSlice.actions;
export default userSlice.reducer;
