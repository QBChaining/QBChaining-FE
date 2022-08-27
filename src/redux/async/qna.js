import { createAsyncThunk } from "@reduxjs/toolkit";
import { qnaApi } from "./../../axios/api/qna";
import { Swal } from "sweetalert2";

export const getQnaListDB = createAsyncThunk(
  "freeBoard/issue/list",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getList();
      if (response.data.ok) {
        return response.data.result;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);
