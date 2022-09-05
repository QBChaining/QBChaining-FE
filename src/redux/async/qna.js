import { createAsyncThunk } from "@reduxjs/toolkit";
import { qnaApi } from "../../axios/api/qnaAPI";
import Swal from "sweetalert2";
import { async } from "@firebase/util";

//게시글 전체 조회
export const getQnaListDB = createAsyncThunk(
  "qna/getlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getList();
      console.log(response);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 상세 조회
export const getOneQnaListDB = createAsyncThunk(
  "qna/getOnelist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getOneList(data);
      console.log(response);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 작성
export const postQnaListDB = createAsyncThunk(
  "qna/postlist",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await qnaApi.postList(data);
      console.log(response);
      if (response.data.success === true) {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 수정
export const editQnaListDB = createAsyncThunk(
  "qna/editlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.editList(data);
      if (response.data.success === true) {
        return;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 전체조회
export const getCommentListDB = createAsyncThunk(
  "qna/getcomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getCommentList(data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 추가
export const postCommentListDB = createAsyncThunk(
  "qna/postcomment",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await qnaApi.postCommentList(data);
      console.log(response);
      if (response.statusText === "Created") {
        return response.data;
      }
    } catch (err) {
      console.log(err);
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 삭제
export const deleteCommentListDB = createAsyncThunk(
  "qna/deletecomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.deleteCommentList(data);
      if (response.data.success === true) {
        return data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 수정
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

//게시글 즐겨찾기 조회
export const getBookmarkListDB = createAsyncThunk(
  "qna/getbookmark",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.getBookmarkList();
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 즐겨찾기 추가
export const postBookmarkListDB = createAsyncThunk(
  "qna/postbookmark",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await qnaApi.postBookmarkList(data);
      console.log(response);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 즐겨찾기 삭제
export const deleteBookmarkListDB = createAsyncThunk(
  "qna/deletebookmark",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.deleteBookmarkList(data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
