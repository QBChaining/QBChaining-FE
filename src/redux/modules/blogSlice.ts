import { createSlice } from "@reduxjs/toolkit";
import {
  getBlogCommunityListDB,
  getBlogDetailDB,
  postBlogCommunityDB,
  getBlogCommentListDB,
  postBlogCommentDB,
  patchBlogCommentDB,
  deleteBlogCommentDB,
  patchBlogCommunityDB,
  getMyBlogDB,
  getBlogBookMarkDB,
  getHotBlogDB,
  postBlogLikeDB,
  deleteBlogBookMarkDB,
  postBlogBookMarkDB,
  unBlogLikeDB,
  postCommentLikeDB,
  delCommentLikeDB,
} from "../async/blog";

export interface IBlogProps {
  blogList: any[];
  blogDetail: { isBookmark: boolean; isLike: boolean; like: number };
  commentList: any[];
  myblog: any[];
  hotBlog: any[];
  blogBookMark: any[];
  likebookmark: {};
  isFetching: boolean;
  isDetailFetcing: boolean;
  errorMessage: "";
  detailErrorMessage: "";
  isMore: boolean;
}

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    blogDetail: {},
    commentList: [],
    myblog: [],
    hotBlog: [],
    blogBookMark: [],
    likebookmark: {},
    isFetching: false,
    isDetailFetcing: false,
    errorMessage: "",
    detailErrorMessage: "",
    isMore: false,
  } as IBlogProps,
  reducers: {
    removeBlogList: state => {
      state.blogList = [];
    },
    removeErrorMessage: state => {
      state.errorMessage = "";
      state.detailErrorMessage = "";
    },
  },
  extraReducers: {
    //블로그 전체조회 부분
    [getBlogCommunityListDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getBlogCommunityListDB.fulfilled.type]: (state, action) => {
      state.blogList = state.blogList.concat(action.payload);
      state.isMore = action.payload.length;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogCommunityListDB.rejected.type]: (state, action) => {
      state.isMore = false;
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 디테일 조회
    [getBlogDetailDB.pending.type]: state => {
      state.isDetailFetcing = true;
    },
    [getBlogDetailDB.fulfilled.type]: (state, action) => {
      state.blogDetail = action.payload;
      state.isDetailFetcing = false;
    },
    [getBlogDetailDB.rejected.type]: (state, action) => {
      state.isDetailFetcing = false;
      state.detailErrorMessage = action.payload;
    },

    //블로그 게시글 생성
    [postBlogCommunityDB.pending.type]: state => {
      state.isFetching = true;
    },
    [postBlogCommunityDB.fulfilled.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postBlogCommunityDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 게시글 수정
    [patchBlogCommunityDB.pending.type]: state => {
      state.isFetching = true;
    },
    [patchBlogCommunityDB.fulfilled.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = null;
    },
    [patchBlogCommunityDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errerMessage;
    },

    //블로그 게시글 삭제
    [deleteBlogCommentDB.pending.type]: state => {
      state.isFetching = true;
    },
    [deleteBlogCommentDB.fulfilled.type]: (state, action) => {
      state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBlogCommentDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errerMessage;
    },

    //댓글 조회 부분
    [getBlogCommentListDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getBlogCommentListDB.fulfilled.type]: (state, action) => {
      //같은 포스트아이디에 comment리스트
      state.commentList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogCommentListDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    //댓글 추가 부분
    [postBlogCommentDB.pending.type]: state => {
      state.isFetching = true;
    },
    [postBlogCommentDB.fulfilled.type]: (state, action) => {
      state.commentList.push(action.payload.data);
      state.isFetching = false;

      state.errorMessage = null;
    },
    [postBlogCommentDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //댓글 수정 부분
    [patchBlogCommentDB.pending.type]: state => {
      state.isFetching = true;
    },
    [patchBlogCommentDB.fulfilled.type]: (state, action) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === action.payload.id;
      });
      state.commentList[idx].comment = action.payload.comment;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [patchBlogCommentDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //댓글 삭제 부분
    [deleteBlogCommentDB.pending.type]: state => {
      state.isFetching = true;
    },
    [deleteBlogCommentDB.fulfilled.type]: (state, action) => {
      const idxx = state.commentList.filter(data => data.id !== action.payload);
      state.commentList = idxx;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBlogCommentDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //마이블로그 조회
    [getMyBlogDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getMyBlogDB.fulfilled.type]: (state, action) => {
      state.myblog = action.payload;

      state.isFetching = false;
      state.errorMessage = null;
    },
    [getMyBlogDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    // 북마크 조회
    [getBlogBookMarkDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getBlogBookMarkDB.fulfilled.type]: (state, action) => {
      state.blogBookMark = action.payload;
      state.isFetching = false;
    },
    [getBlogBookMarkDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 북마크 추가
    [postBlogBookMarkDB.pending.type]: state => {
      state.isFetching = true;
    },
    [postBlogBookMarkDB.fulfilled.type]: (state, action) => {
      state.blogDetail.isBookmark = true;
      state.blogBookMark.push(action.payload);
    },
    [postBlogBookMarkDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //북마크 삭제
    [deleteBlogBookMarkDB.pending.type]: state => {
      state.isFetching = true;
    },
    [deleteBlogBookMarkDB.fulfilled.type]: (state, action) => {
      const newBlogBookMark = state.blogBookMark.filter(
        data => data.id !== parseInt(action.payload),
      );
      state.blogDetail.isBookmark = false;
      state.blogBookMark = newBlogBookMark;
      state.isFetching = false;
    },
    [deleteBlogBookMarkDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //추천 많이 받은 블로그
    [getHotBlogDB.pending.type]: state => {
      state.isFetching = true;
    },
    [getHotBlogDB.fulfilled.type]: (state, action) => {
      state.hotBlog = action.payload;
    },
    [getHotBlogDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 좋아요 추가
    [postBlogLikeDB.pending.type]: state => {
      state.isFetching = true;
    },
    [postBlogLikeDB.fulfilled.type]: (state, action) => {
      state.blogDetail.isLike = true;
      state.blogDetail.like += 1;
      state.isFetching = false;
    },
    [postBlogLikeDB.rejected.type]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isFetching = false;
    },

    // 좋아요 삭제
    [unBlogLikeDB.pending.type]: state => {
      state.isFetching = true;
    },
    [unBlogLikeDB.fulfilled.type]: (state, action) => {
      state.blogDetail.isLike = false;
      state.blogDetail.like -= 1;
      state.likebookmark = action.payload;
      state.isFetching = false;
    },
    [unBlogLikeDB.rejected.type]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },
    //--- 댓글 좋아요 ---
    // 댓글 좋아요 추가
    [postCommentLikeDB.pending.type]: state => {
      state.isFetching = true;
    },
    [postCommentLikeDB.fulfilled.type]: (state, action) => {
      state.isFetching = false;
    },
    [postCommentLikeDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    // 댓글 좋아요 취소
    [delCommentLikeDB.pending.type]: state => {
      state.isFetching = true;
    },
    [delCommentLikeDB.fulfilled.type]: (state, action) => {
      state.isFetching = false;
    },
    [delCommentLikeDB.rejected.type]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { removeBlogList, removeErrorMessage } = blogSlice.actions;
export default blogSlice.reducer;
