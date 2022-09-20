import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "./../../axios/api/userAPI";

//alert
import { errorLikeAlert, networkError, successAlert } from "../../utils/swal";

//error loging
import * as Sentry from "@sentry/react";

export const postUserInfoDB = createAsyncThunk(
  "auth/postuserinfo",
  async (data, thunkAPI) => {
    try {
      const response = await userApi.postUserInfo(data);
      console.log(response);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 유저 정보 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
