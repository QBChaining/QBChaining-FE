import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "../../axios/api/notificationAPI";

import { networkError } from "../../utils/swal";

import * as Sentry from "@sentry/react";
import { successAlert } from "../../utils/swal";

export const getNotificationDB = createAsyncThunk(
  "GET_NOTIFICATION",
  async thunkAPI => {
    try {
      const response = await notification.getNotification();
      return response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
);

export const postNotificationDB = createAsyncThunk(
  "POST_NOTIFICATION",
  async (id, thunkAPI) => {
    try {
      const response = await notification.postNotification(id);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
);
