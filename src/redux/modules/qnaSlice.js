import { createSlice } from "@reduxjs/toolkit";
import {
  getQnaListDB,
  getQnaCategoryListDB,
  getOneQnaListDB,
  postQnaListDB,
  editQnaListDB,
  getCommentListDB,
  postCommentListDB,
  deleteCommentListDB,
  editCommentListDB,
  getBookmarkListDB,
  postBookmarkListDB,
  deleteBookmarkListDB,
  likeCommentListDB,
  dislikeCommentListDB,
  choiceCommentListDB,
  getQnaLikeListDB,
  likeQnaListDB,
  dislikeQnaListDB,
} from "../async/qna";

const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    qnaList: [],
    qnaTarget: {},
    commentList: [],
    bookmarkList: [],
    isFetching: false,
    errorMessage: "",
  },
  reducers: {
    removeUserInfo: (state, { payload }) => {
      state.bookmarkList = [];
    },
  },
  extraReducers: {
    //게시글조회
    [getQnaListDB.fulfilled]: (state, { payload }) => {
      //payload에는 전체 리스트가 들어있다
      state.qnaList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //getQnaCategoryListDB,
    [getQnaCategoryListDB.fulfilled]: (state, { payload }) => {
      //payload에는 전체 리스트가 들어있다
      state.qnaList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaCategoryListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaCategoryListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //상세qna 조회
    [getOneQnaListDB.fulfilled]: (state, { payload }) => {
      //payload에는 타겟qna가 있다
      state.qnaTarget = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getOneQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getOneQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 생성
    [postQnaListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 수정
    [editQnaListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천 목록조회
    [getQnaLikeListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaLikeListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaLikeListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천
    [likeQnaListDB.fulfilled]: (state, { payload }) => {
      state.qnaTarget.is_honey_tip = true;
      state.qnaTarget.honey_tip += 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [likeQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [likeQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천 취소
    [dislikeQnaListDB.fulfilled]: (state, { payload }) => {
      state.qnaTarget.is_honey_tip = false;
      state.qnaTarget.honey_tip -= 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [dislikeQnaListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [dislikeQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 조회
    [getCommentListDB.fulfilled]: (state, { payload }) => {
      state.commentList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 생성
    [postCommentListDB.fulfilled]: (state, { payload }) => {
      state.commentList.push(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 삭제
    [deleteCommentListDB.fulfilled]: (state, { payload }) => {
      const newCommentList = state.commentList.filter(
        data => data.id !== payload,
      );
      state.commentList = newCommentList;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [deleteCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 수정
    [editCommentListDB.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 추천
    [likeCommentListDB.fulfilled]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload;
      });
      state.commentList[idx].is_honey_tip = true;
      state.commentList[idx].honey_tip += 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [likeCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [likeCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 추천 취소
    [dislikeCommentListDB.fulfilled]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload;
      });
      state.commentList[idx].is_honey_tip = false;
      state.commentList[idx].honey_tip -= 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [dislikeCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [dislikeCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 조회
    [getBookmarkListDB.fulfilled]: (state, { payload }) => {
      state.bookmarkList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBookmarkListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getBookmarkListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 추가
    [postBookmarkListDB.fulfilled]: (state, { payload }) => {
      state.bookmarkList.push(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postBookmarkListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postBookmarkListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 삭제
    [deleteBookmarkListDB.fulfilled]: (state, { payload }) => {
      const newBookmarkList = state.bookmarkList.filter(
        data => data.qna_id !== payload,
      );
      state.bookmarkList = newBookmarkList;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBookmarkListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [deleteBookmarkListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 채택
    [choiceCommentListDB.fulfilled]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload.id;
      });
      state.commentList[idx].is_choose = true;
      state.qnaTarget.is_resolve = true;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [choiceCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [choiceCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});
export const { removeUserInfo } = qnaSlice.actions;
export default qnaSlice.reducer;
