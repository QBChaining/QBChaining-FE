import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "../../axios/api/blogApi";
import Swal from "sweetalert2";

//블로그 커뮤니티
export const getBlogCommunityListDB = createAsyncThunk(
  "BLOG_COMMUNITYLIST",
  async thunkAPI => {
    try {
      const response = await blogApi.getBlogCommunityList();
      if (response.statusText === "OK") {
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//블로그 디테일
export const getBlogDetailDB = createAsyncThunk(
  "BLOG_DETAIL",
  async (id, thunkAPI) => {
    console.log("디테일조회", id);
    try {
      const response = await blogApi.getBlogDetail(id);
      console.log("디테일리스폰", response);

      return response.data.data;
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//블로그 커뮤니티 생성
export const postBlogCommunityDB = createAsyncThunk(
  "BLOG_COMMUNITY",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.poastBlogCommunity(data);
      if (response.statusText === "OK") {
        return response.data.success;
      }
    } catch (err) {
      console.log(err);
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");

      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 커뮤니티 수정
export const patchBlogCommunityDB = createAsyncThunk(
  "BLOG_EDIT",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.editBlogCommunity(data);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

// 댓글 조회
export const getBlogCommentListDB = createAsyncThunk(
  "BLOG_COMMENTLIST",
  async thunkAPI => {
    try {
      const response = await blogApi.getBlogCommentList();
      if (response.statusText === "OK") {
        //이거 몰까요?
        return response.data.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//댓글 추가
export const postBlogCommentDB = createAsyncThunk(
  "POST_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    console.log("데이터", data);
    try {
      const response = await blogApi.postBlogComment(data);
      console.log("첫번째", response);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 수정
export const patchBlogCommentDB = createAsyncThunk(
  "PATCH_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.patchBlogComment(data);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//댓글 삭제
export const deleteBlogCommentDB = createAsyncThunk(
  "DELETE_BLOG_COMMENTLIST",
  async (commentId, thunkAPI) => {
    try {
      const response = await blogApi.DeleteBlogComment(commentId);
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
