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

export interface IQnaProps {
  qnaList: any[];
  qnaTarget: {
    category: string;
    content: string;
    createdAt: string;
    id: number;
    isBookmark: boolean;
    isLike: boolean;
    isResolve: number;
    like: number;
    profileImg: string;
    tags: string[];
    title: string;
    userName: string;
  };
  commentList: any[];
  chooseComment: {};
  bookmarkList: any[];
  qnaHotList: any[];
  isCommentWrite: boolean;
  errorMessage: string;
  detailErrorMessage: string;
  isFetching: boolean;
  isDetailFetcing: boolean;
  isCommentFetching: boolean;
}

const qnaSlice = createSlice({
  name: "qna",
  initialState: {
    qnaList: [],
    qnaTarget: {},
    commentList: [],
    chooseComment: {},
    bookmarkList: [],
    qnaHotList: [],
    isCommentWrite: false,
    errorMessage: "",
    detailErrorMessage: "",
    isFetching: false,
    isDetailFetcing: false,
    isCommentFetching: false,
  } as IQnaProps,
  reducers: {
    removeUserInfo: state => {
      state.bookmarkList = [];
    },
    removeQnaList: state => {
      state.qnaList = [];
      state.qnaTarget = {
        isLike: false,
        like: 0,
        isBookmark: false,
        isResolve: false,
      };
    },
    removeCommentList: state => {
      state.commentList = [];
      state.chooseComment = {};
    },
    removeErrorMessage: state => {
      state.errorMessage = "";
      state.detailErrorMessage = "";
    },
  },
  extraReducers: {
    //게시글 채택 조회
    [getQnaMainListDB.fulfilled.type]: (state, { payload }) => {
      //payload에는 전체 리스트가 들어있다
      state.qnaList = state.qnaList.concat(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaMainListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaMainListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //getQnaCategoryListDB,
    [getQnaCategoryListDB.fulfilled.type]: (state, { payload }) => {
      //payload에는 전체 리스트가 들어있다
      state.qnaList = state.qnaList.concat(payload);
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaCategoryListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaCategoryListDB.rejected.type]: (
      state,
      { payload: errorMessage },
    ) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },

    //상세qna 조회
    [getOneQnaListDB.fulfilled.type]: (state, { payload }) => {
      //payload에는 타겟qna가 있다
      state.qnaTarget = payload;
      state.isDetailFetcing = false;
      state.errorMessage = null;
    },
    [getOneQnaListDB.pending.type]: (state, { payload }) => {
      state.isDetailFetcing = true;
    },
    [getOneQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isDetailFetcing = false;
      state.detailErrorMessage = errorMessage;
    },
    //게시글 생성
    [postQnaListDB.fulfilled.type]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 수정
    [editQnaListDB.fulfilled.type]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천 목록조회
    [getQnaLikeListDB.fulfilled.type]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaLikeListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaLikeListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천
    [likeQnaListDB.fulfilled.type]: (state, { payload }) => {
      state.qnaTarget.isLike = true;
      state.qnaTarget.like += 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [likeQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [likeQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 추천 취소
    [dislikeQnaListDB.fulfilled.type]: (
      state: {
        qnaTarget: { isLike: boolean; like: number };
        isFetching: boolean;
        errorMessage: string;
      },
      { payload },
    ) => {
      state.qnaTarget.isLike = false;
      state.qnaTarget.like -= 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [dislikeQnaListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [dislikeQnaListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 조회
    [getCommentListDB.fulfilled.type]: (state, { payload }) => {
      state.chooseComment = payload.chooseComment;
      state.commentList = state.commentList.concat(payload.commentLists);
      state.isCommentFetching = false;
      state.errorMessage = null;
    },
    [getCommentListDB.pending.type]: (state, { payload }) => {
      state.isCommentFetching = true;
    },
    [getCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isCommentFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 생성
    [postCommentListDB.fulfilled.type]: (state, { payload }) => {
      state.commentList.push(payload);
      state.isFetching = false;
      state.isCommentWrite = true;
      state.errorMessage = null;
    },
    [postCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
      state.isCommentWrite = false;
    },
    [postCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 삭제
    [deleteCommentListDB.fulfilled.type]: (state, { payload }) => {
      const newCommentList = state.commentList.filter(
        data => data.id !== payload,
      );
      state.commentList = newCommentList;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [deleteCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 수정
    [editCommentListDB.fulfilled.type]: (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [editCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [editCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 추천
    [likeCommentListDB.fulfilled.type]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload;
      });
      state.commentList[idx].isLike = true;
      state.commentList[idx].like += 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [likeCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [likeCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 추천 취소
    [dislikeCommentListDB.fulfilled.type]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload;
      });
      state.commentList[idx].isLike = false;
      state.commentList[idx].like -= 1;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [dislikeCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [dislikeCommentListDB.rejected.type]: (
      state,
      { payload: errorMessage },
    ) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 조회
    [getBookmarkListDB.fulfilled.type]: (state, { payload }) => {
      state.bookmarkList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBookmarkListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getBookmarkListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 추가
    [postBookmarkListDB.fulfilled.type]: (state, { payload }) => {
      state.bookmarkList.unshift(payload);
      state.qnaTarget.isBookmark = true;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postBookmarkListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [postBookmarkListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //게시글 즐겨찾기 삭제
    [deleteBookmarkListDB.fulfilled.type]: (state, { payload }) => {
      const newBookmarkList = state.bookmarkList.filter(
        data => data.id !== payload,
      );
      state.bookmarkList = newBookmarkList;
      state.qnaTarget.isBookmark = false;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBookmarkListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [deleteBookmarkListDB.rejected.type]: (
      state,
      { payload: errorMessage },
    ) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //댓글 채택
    [choiceCommentListDB.fulfilled.type]: (state, { payload }) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === payload.id;
      });
      state.commentList[idx].isChoose = true;
      state.qnaTarget.isResolve = true;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [choiceCommentListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [choiceCommentListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
    //추천 많이받은 게시글
    [getQnaHotListDB.fulfilled.type]: (state, { payload }) => {
      state.qnaHotList = payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getQnaHotListDB.pending.type]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getQnaHotListDB.rejected.type]: (state, { payload: errorMessage }) => {
      state.isFetching = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const {
  removeUserInfo,
  removeQnaList,
  removeCommentList,
  removeErrorMessage,
} = qnaSlice.actions;
export default qnaSlice.reducer;
