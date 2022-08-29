import { createAsyncThunk } from "@reduxjs/toolkit";
import { qnaApi } from "./../../axios/api/qna";
import { Swal } from "sweetalert2";
import { async } from "@firebase/util";

export const getQnaListDB = createAsyncThunk(
  "qna/getlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getList();
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

export const getOneQnaListDB = createAsyncThunk(
  "qna/getOnelist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getOneList(data);
      if (response.statusText === "OK") {
        console.log(response);
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

export const postQnaListDB = createAsyncThunk(
  "qna/postlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.postList(data);
      console.log(response);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);

export const editQnaListDB = createAsyncThunk(
  "qna/editList",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await qnaApi.editList(data);
      if (response.statusText === "OK") {
        console.log(response);
        return;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);
