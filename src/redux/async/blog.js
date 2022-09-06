import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "../../axios/api/blogApi";
import Swal from "sweetalert2";

//블로그 커뮤니티 조회
export const getBlogCommunityListDB = createAsyncThunk(
  "BLOG_COMMUNITYLIST",
  async thunkAPI => {
    try {
      const response = await blogApi.getBlogCommunityList();
      if (response.data.success === true) {
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
    try {
      const response = await blogApi.getBlogDetail(id);
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
      if (response.data.success === true) {
        return response.data.success;
      }
    } catch (err) {
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
        return response.data.success;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.!", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 커뮤니티 삭제
export const deleteBlogCommunityDB = createAsyncThunk(
  "BLOG_DELETE",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.deleteBlogCommunity(id);
      if (response.data.success === true) {
        return response.data;
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

// 댓글 조회
export const getBlogCommentListDB = createAsyncThunk(
  "BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getBlogCommentList(data);
      if (response.statusText === "OK") {
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
    try {
      const response = await blogApi.postBlogComment(data);
      if (response.statusText === "CREATED") {
        return response.data.success;
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
        return response.data.success;
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
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.DeleteBlogComment(id);
      if (response.statusText === "OK") {
        return response.data.success;
      }
    } catch (err) {
      Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//마이블로그조회
export const getMyBlogDB = createAsyncThunk("GET_MY_BLOG", async thunkAPI => {
  try {
    const response = await blogApi.getMyBlog();

    return response.data.data;
  } catch (err) {
    Swal.fire("에러", "네트워크 연결 상태를 확인해주세요.", "error");
    return thunkAPI.rejectWithValue(err.response.message);
  }
});
