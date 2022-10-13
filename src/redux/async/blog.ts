import { createAsyncThunk } from "@reduxjs/toolkit";
import { blogApi } from "../../axios/api/blogApi";
//경고창
import { errorAlert, networkError } from "../../utils/swal";

//에러 로딩
import * as Sentry from "@sentry/react";
import { successAlert } from "../../utils/swal";

//블로그 커뮤니티 조회
export const getBlogCommunityListDB = createAsyncThunk(
  "BLOG_COMMUNITYLIST",
  async (data: number, thunkAPI) => {
    try {
      const response = await blogApi.getBlogCommunityList(data);
      if (response.data.success === true) {
      }
      return response.data.data;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 전체조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

//블로그 디테일
export const getBlogDetailDB = createAsyncThunk(
  "BLOG_DETAIL",
  async (id: string, thunkAPI) => {
    try {
      const response = await blogApi.getBlogDetail(id);

      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
      Sentry.captureException(`error, 블로그 상세 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err);
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
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 작성: ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
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
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 게시물 수정 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

//블로그 게시글 삭제
export const deleteBlogCommunityDB = createAsyncThunk(
  "BLOG_DELETE",
  async (id: string, thunkAPI) => {
    try {
      const response = await blogApi.deleteBlogCommunity(id);

      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }

      Sentry.captureException(`error, 블로그 게시물 삭제 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// 댓글 조회
export const getBlogCommentListDB = createAsyncThunk(
  "BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getBlogCommentList(data);

      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }

      Sentry.captureException(`error, 댓글 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
//댓글 추가
export const postBlogCommentDB = createAsyncThunk(
  "POST_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.postBlogComment(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추가 되었습니다.");
        return response.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 댓글 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response);
    }
  },
);

//댓글 수정
export const patchBlogCommentDB = createAsyncThunk(
  "PATCH_BLOG_COMMENTLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.patchBlogComment(data);
      if (response.data.success === true) {
        successAlert("정상적으로 수정 되었습니다.");
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 댓글 수정 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
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
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 블로그 댓글 삭제 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
//마이블로그조회
export const getMyBlogDB = createAsyncThunk(
  "GET_MY_BLOG",
  async (data: { id: number }, thunkAPI) => {
    try {
      const response = await blogApi.getMyBlog(data.id);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, MYBLOG 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// 좋아요 추가
export const postBlogLikeDB = createAsyncThunk(
  "ADD_LIKE",
  async (id: string, thunkAPI) => {
    try {
      const response = await blogApi.postBlogLike(id);
      if (response.data.success === true) {
        successAlert("좋아요를 누르셨습니다.");
        return response.data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

//좋아요 삭제
export const unBlogLikeDB = createAsyncThunk(
  "UN_LIKE",
  async (id: string, thunkAPI) => {
    try {
      const response = await blogApi.unBlogLike(id);
      successAlert("좋아요가 취소 되었습니다.");
      return response.data;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
//블로그 북마크 조회
export const getBlogBookMarkDB = createAsyncThunk(
  "GET_BOOK_MRRK",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getBlogBookMark();
      return response.data.data;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 북마크 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

//블로그 북마크 추가
export const postBlogBookMarkDB = createAsyncThunk(
  "ADD_BOOK_MARK",
  async (
    data: { id: string; title: string; user_name: string; createdAt: string },
    thunkAPI,
  ) => {
    try {
      const response = await blogApi.postBlogBookMark(data);
      if (response.data.success === true) {
        successAlert("블로그 즐겨찾기에 추가가 되었습니다.");
        return data;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 북마크 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

//블로그 북마크 삭제
export const deleteBlogBookMarkDB = createAsyncThunk(
  "DEL_BOOK_MARK",
  async (id: string, thunkAPI) => {
    try {
      const response = await blogApi.delBlogBookMark(id);
      if (response.data.success === true) {
        successAlert("블로그 즐겨찾기에서 제거 되었습니다.");
        return id;
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 북마크 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// 추천 많이 받은 블로그
export const getHotBlogDB = createAsyncThunk(
  "HOT_BLOG",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getHotBlog();
      return response.data.data;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 추천 많이 받은 블로그 조회: ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

// 댓글 좋아요
export const postCommentLikeDB = createAsyncThunk(
  "COMMENT_POST_LIKE",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.postCommentLike(id);
      if (response.data.success === true) {
        successAlert("좋아요가 추가 되었습니다.");
      }
      return;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 댓글 좋아요 추가 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
// 댓글 좋아요 취소
export const delCommentLikeDB = createAsyncThunk(
  "COMMENT_UN_LIKE",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.delCommentLike(id);
      if (response.data.success === true) {
        successAlert("좋아요가 취소 되었습니다.");
      }
      return;
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, 댓글 좋아요 삭제: ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
