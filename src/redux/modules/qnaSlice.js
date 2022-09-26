import { createSlice } from "@reduxjs/toolkit";
import {
  getQnaMainListDB,
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
  getQnaHotListDB,
} from "../async/qna";

const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    qnaList: [],
    qnaTarget: {},
    commentList: [],
    bookmarkList: [],
    qnaHotList: [],
    isCommentWrite: false,
    errorMessage: "",
    isFetching: false,
    isDetailFetcing: false,
    isCommentFetching: false,
  },
  reducers: {
    removeUserInfo: (state, { payload }) => {
      state.bookmarkList = [];
    },
    removeQnaList: (state, { payload }) => {
      state.qnaList = [];
      state.qnaTarget = {};
    },
    removeCommentList: (state, { payload }) => {
      state.commentList = [];
    },
  },
  extraReducers: {
    //게시글 채택 조회
    [getQnaMainListDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      //payload에는 전체 리스트가 들어있다
      state.qnaList = state.qnaList.concat(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaMainListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaMainListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //getQnaCategoryListDB,
    [getQnaCategoryListDB.fulfilled]: (state, { payload }) => {
      //payload에는 전체 리스트가 들어있다
      state.qnaList = state.qnaList.concat(payload);
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
      state.isDetailFetcing = false;
      state.errorMessage = null;
    },
    [getOneQnaListDB.pending]: (state, { payload }) => {
      state.isDetailFetcing = true;
    },
    [getOneQnaListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isDetailFetcing = false;
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
      state.qnaTarget.isLike = true;
      state.qnaTarget.like += 1;
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
      state.qnaTarget.isLike = false;
      state.qnaTarget.like -= 1;
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
      state.commentList = state.commentList.concat(payload);
      state.isCommentFetching = false;
      state.errorMessage = null;
    },
    [getCommentListDB.pending]: (state, { payload }) => {
      state.isCommentFetching = true;
    },
    [getCommentListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isCommentFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 생성
    [postCommentListDB.fulfilled]: (state, { payload }) => {
      state.commentList.push(payload);
      state.isFetching = false;
      state.isCommentWrite = true;
      state.errorMessage = null;
    },
    [postCommentListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
      state.isCommentWrite = false;
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
      state.commentList[idx].isLike = true;
      state.commentList[idx].like += 1;
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
      state.commentList[idx].isLike = false;
      state.commentList[idx].like -= 1;
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
      state.bookmarkList.unshift(payload);
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
        data => data.id !== payload,
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
      state.commentList[idx].isChoose = true;
      state.qnaTarget.isResolve = true;
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
    //추천 많이받은 게시글
    [getQnaHotListDB.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.qnaHotList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaHotListDB.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaHotListDB.rejected]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});
export const { removeUserInfo, removeQnaList, removeCommentList } =
  qnaSlice.actions;
export default qnaSlice.reducer;
