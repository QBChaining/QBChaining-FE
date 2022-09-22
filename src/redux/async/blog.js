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
      console.log("블로그메인조회", response);
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
    console.log("디테일 데이터", id);
    try {
      const response = await blogApi.getBlogDetail(id);
      console.log("블로그디테일", response);

      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, 블로그 상세 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  },
);

//블로그 커뮤니티 생성
export const postBlogCommunityDB = createAsyncThunk(
  "BLOG_COMMUNITY",
  async (data, thunkAPI) => {
    console.log("게시글생성데이터", data);
    try {
      const response = await blogApi.postBlogCommunity(data);
      console.log("블로그커뮤니티생성", response);
      if (response.data.success === true) {
        return response;
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
      console.log("블로그커뮤니티 수정", response);

      if (response.data.success === true) {
        successAlert("수정 되었습니다!");
        return response.data.data;
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
    try {
      const response = await blogApi.deleteBlogCommunity(id);
      console.log("블로그커뮤니티삭제", response);

      if (response.data.success === true) {
        return response.data.data;
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
      console.log("댓글 조회", response);

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
      console.log("댓글 댓글추가", response);
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
    try {
      const response = await blogApi.patchBlogComment(data);
      console.log("댓글 수정", response);
      if (response.data.success === true) {
        successAlert("정상적으로 수정 되었습니다.");
        return response.data.data;
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
      console.log("댓글 삭제", response);
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
    console.log("마이블로그조회", response);
    if (response.data.success === true) {
      return response.data.data;
    }
  } catch (err) {
    Sentry.captureException(`error, MYBLOG 조회 : ${err}`);
    return thunkAPI.rejectWithValue(err.response.message);
  }
});

// 좋아요 추가
export const postBlogLikeDB = createAsyncThunk(
  "ADD_LIKE",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.postBlogLike(id);
      console.log("좋아요추가", response);
      if (response.data.success === true) {
        successAlert("좋아요를 누르셨습니다.");
        return response.data;
      }
    } catch (err) {
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
//좋아요 삭제
export const unBlogLikeDB = createAsyncThunk(
  "UN_LIKE",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.unBlogLike(id);
      console.log("좋아요삭제", response);
      successAlert("좋아요가 취소 되었습니다.");
      return response.data;
    } catch (err) {}
  },
);
//블로그 북마크 조회
export const getBlogBookMarkDB = createAsyncThunk(
  "GET_BOOK_MRRK",
  async thunkAPI => {
    try {
      const response = await blogApi.getBlogBookMark();
      console.log("블로그북마크조회", response);
      return response.data.data;
    } catch (err) {
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 북마크 추가
export const postBlogBookMarkDB = createAsyncThunk(
  "ADD_BOOK_MARK",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.postBlogBookMark(data);
      console.log("블로그북마크추가", response);
      if (response.data.success === true) {
        successAlert("블로그 즐겨찾기에 추가가 되었습니다.");
        return data;
      }
    } catch (err) {
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//블로그 북마크 삭제
export const deleteBlogBookMarkDB = createAsyncThunk(
  "DEL_BOOK_MARK",
  async (id, thunkAPI) => {
    try {
      const response = await blogApi.delBlogBookMark(id);
      console.log("북마크 삭제", response);
      if (response.data.success === true) {
        successAlert("블로그 즐겨찾기에서 제거 되었습니다.");
        return id;
      }
    } catch (err) {
      Sentry.captureException(`error, 좋아요 에러. ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

// 추천 많이 받은 블로그
export const getHotBlogDB = createAsyncThunk("HOT_BLOG", async thunkAPI => {
  try {
    const response = await blogApi.getHotBlog();
    console.log("추천많이받은블로그", response);
    return response.data.data;
  } catch (err) {
    Sentry.captureException(`error, 좋아요 에러. ${err}`);
    return thunkAPI.rejectWithValue(err.response.message);
  }
});

//블로그 미리보기
export const getPreViewDB = createAsyncThunk("PREVIEW", async thunkAPI => {
  try {
    const response = await blogApi.getPreView();
    return response;
  } catch (err) {}
});
