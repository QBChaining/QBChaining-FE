import { createSlice } from "@reduxjs/toolkit";
import { deleteCookie, getCookie } from "./../../utils/cookie";
import { jwt_decode } from "jwt-decode";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userEmail: null,
  },
  reducers: {
    logOut: (state, action) => {
      deleteCookie("token");
      state.isLogin = false;
      state.user = {
        nickname: null,
        userId: null,
        iat: null,
      };
    },
    logIn: (state, action) => {
      state.isLogin = true;
      state.userToken = getCookie("token");
    },
  },
});

export const { logOut, logIn } = userSlice.actions;
export default userSlice.reducer;
