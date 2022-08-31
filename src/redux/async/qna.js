import { createAsyncThunk } from "@reduxjs/toolkit";
import { qnaApi } from "../../axios/api/qnaAPI";
import Swal from "sweetalert2";

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
  },
);

export const getOneQnaListDB = createAsyncThunk(
  "qna/getOnelist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getOneList(data);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
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
  },
);

export const editQnaListDB = createAsyncThunk(
  "qna/editlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.editList(data);
      if (response.statusText === "OK") {
        return;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const getCommentListDB = createAsyncThunk(
  "qna/getcomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getCommentList(data);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const postCommentListDB = createAsyncThunk(
  "qna/postcomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.postCommentList(data);
      console.log(response);
      if (response.statusText === "Created") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const deleteCommentListDB = createAsyncThunk(
  "qna/deletecomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.deleteCommentList(data);
      if (response.statusText === "OK") {
        return data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

export const editCommentListDB = createAsyncThunk(
  "qna/editcomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.editCommentList(data);
      if (response.statusText === "OK") {
        return data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
