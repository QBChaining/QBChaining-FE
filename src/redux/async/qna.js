import { createAsyncThunk } from "@reduxjs/toolkit";
import { qnaApi } from "../../axios/api/qnaAPI";
//alert
import { errorLikeAlert, networkError, successAlert } from "../../utils/swal";

//error loging
import * as Sentry from "@sentry/react";

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
      networkError();
      Sentry.captureException(`error, 게시글 전체조회 : ${err}`);
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
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 상세 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 작성
export const postQnaListDB = createAsyncThunk(
  "qna/postlist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.postList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추가 되었습니다.");
        return response.data;
      }
    } catch (err) {
      console.log(err);
      networkError();
      Sentry.captureException(`error, QNA게시글 작성 : ${err}`);
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
        successAlert("정상적으로 수정 되었습니다.");
        return;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 수정 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 추천 조회
export const getQnaLikeListDB = createAsyncThunk(
  "qna/getqnalikelist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.likeQnaList(data);
      if (response.data.success === true) {
        return;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 추천 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 추천
export const likeQnaListDB = createAsyncThunk(
  "qna/likeqnalist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.likeQnaList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추천 되었습니다.");
        return;
      }
    } catch (err) {
      if (err.response.data.message === "반복해서 눌렀습니다.") {
        errorLikeAlert(err.response.data.message);
        return;
      }
      networkError();
      Sentry.captureException(`error, QNA게시글 추천 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 추천 취소
export const dislikeQnaListDB = createAsyncThunk(
  "qna/dislikeqnalist",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.dislikeQnaList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추천 취소 되었습니다.");
        return;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 추천 취소 : ${err}`);
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
      console.log(response.data.data);
      if (response.data.success === true) {
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 전체 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 추가
export const postCommentListDB = createAsyncThunk(
  "qna/postcomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.postCommentList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추가 되었습니다.");
        response.data.data.honey_tip = 0;
        response.data.data.user_name = data.user_name;
        response.data.data.is_choose = false;
        return response.data.data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 추가 : ${err}`);
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
        successAlert("정상적으로 삭제 되었습니다.");
        return data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 삭제 : ${err}`);
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
      if (response.data.success === true) {
        successAlert("정상적으로 수정 되었습니다.");
        return data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 수정 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 추천
export const likeCommentListDB = createAsyncThunk(
  "qna/likecomment",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await qnaApi.likeCommentList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추천 되었습니다.");
        return data;
      }
    } catch (err) {
      if (err.response.data.message === "반복해서 눌렀습니다.") {
        errorLikeAlert(err.response.data.message);
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 추천 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 취소
export const dislikeCommentListDB = createAsyncThunk(
  "qna/dislikecomment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.dislikeCommentList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 추천 취소 되었습니다.");
        return data;
      }
    } catch (err) {
      if (err.response.data.message === "반복해서 눌렀습니다.") {
        errorLikeAlert(err.response.data.message);
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
      networkError();
      Sentry.captureException(`error, QNA게시글 댓글 추천 : ${err}`);
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
      networkError();
      Sentry.captureException(`error, QNA게시글 즐겨찾기 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//게시글 즐겨찾기 추가
export const postBookmarkListDB = createAsyncThunk(
  "qna/postbookmark",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.postBookmarkList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 즐겨찾기에 추가 되었습니다.");
        return data;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 즐겨찾기 추가 : ${err}`);
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
        successAlert("정상적으로 즐겨찾기 삭제 되었습니다.");
        return data.qna_id;
      }
    } catch (err) {
      networkError();
      Sentry.captureException(`error, QNA게시글 즐겨찾기 삭제 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);

//댓글 채택
export const choiceCommentListDB = createAsyncThunk(
  "qna/choiceComment",
  async (data, thunkAPI) => {
    try {
      const response = await qnaApi.choiceCommentList(data);
      if (response.data.success === true) {
        successAlert("정상적으로 채택 되었습니다.");
        return data;
      }
    } catch (err) {
      if (err.response.data.message === "채택은 게시글 작성자만 가능합니다.") {
        errorLikeAlert(err.response.data.message);
        return thunkAPI.rejectWithValue(err.response.data.message);
      }
      networkError();
      Sentry.captureException(`error, QNA 댓글 채택 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.message);
    }
  },
);
