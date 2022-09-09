import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "../../axios/api/blogApi";
//경고창
import { networkError } from "../../utils/swal";

//에러 로딩
import * as Sentry from "@sentry/react";
import { successAlert } from "../../utils/swal";

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
      networkError();
      Sentry.captureException(`error, 블로그 전체조회 : ${err}`);
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
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 블로그 상세 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 커뮤니티 생성
export const postBlogCommunityDB = createAsyncThunk(
  "BLOG_COMMUNITY",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.postBlogCommunity(data);
      if (response.data.success === true) {
        return;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 블로그 작성: ${err}`);
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
      if (response.data.success === true) {
        successAlert("수정 되었습니다!");
        return;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 블로그 게시물 수정 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 게시글 삭제
export const deleteBlogCommunityDB = createAsyncThunk(
  "BLOG_DELETE",
  async (id, thunkAPI) => {
    console.log(id);
    try {
      const response = await blogApi.deleteBlogCommunity(id);
      console.log(response);
      if (response.data.success === true) {
        return;
      }
    } catch (err) {
      Sentry.captureException(`error, 블로그 게시물 삭제 : ${err}`);
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
      console.log("댓글조회", response);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      Sentry.captureException(`error, 댓글 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//댓글 추가
export const postBlogCommentDB = createAsyncThunk(
  "POST_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await blogApi.postBlogComment(data);
      console.log("댓글추가", response);
      if (response.data.success === true) {
        successAlert("정상적으로 추가 되었습니다.");
        return response.data;
      }
    } catch (err) {
      Sentry.captureException(`error, 블로그 댓글 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response);
    }
  },
);

//댓글 수정
export const patchBlogCommentDB = createAsyncThunk(
  "PATCH_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await blogApi.patchBlogComment(data);
      console.log("댓글수정", response);
      if (response.data.success === true) {
        successAlert("정상적으로 수정 되었습니다.");
        return response.data;
      }
    } catch (err) {
      Sentry.captureException(`error, 블로그 댓글 수정 : ${err}`);
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
      if (response.data.success === true) {
        successAlert("정상적으로 삭제 되었습니다.");
        return id;
      }
    } catch (err) {
      Sentry.captureException(`error, 블로그 댓글 삭제 성공! : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//마이블로그조회
export const getMyBlogDB = createAsyncThunk("GET_MY_BLOG", async thunkAPI => {
  try {
    const response = await blogApi.getMyBlog();
    if (response.data.success === true) {
      return response.data.data;
    }
  } catch (err) {
    Sentry.captureException(`error, MYBLOG 조회 : ${err}`);
    return thunkAPI.rejectWithValue(err.response.message);
  }
});
