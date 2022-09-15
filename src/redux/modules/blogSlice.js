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
  deleteBlogBookMarDB,
} from "../async/blog";
import { postBookmarkListDB } from "../async/qna";
export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogList: [],
    blogDetail: [],
    commentList: [],
    myblog: [],
    hotBlog: [],
    blogBookMark: [],
    isFetching: false,
    errorMessage: "",
    type: {},
  },
  reducers: {},
  extraReducers: {
    //블로그 전체조회 부분
    [getBlogCommunityListDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogCommunityListDB.fulfilled]: (state, action) => {
      //블로그 메인 게시물 리스트 GET
      state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogCommunityListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 디테일 조회
    [getBlogDetailDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogDetailDB.fulfilled]: (state, action) => {
      //블로그 디테일 게시물
      state.blogDetail = action.payload;
      state.isFetching = false;
    },
    [getBlogDetailDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 게시글 생성
    [postBlogCommunityDB.pending]: state => {
      state.isFetching = true;
    },
    [postBlogCommunityDB.fulfilled]: (state, action) => {
      state.blogList.push(action.payload);
      // state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [postBlogCommunityDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //블로그 게시글 수정
    [patchBlogCommunityDB.pending]: state => {
      state.isFetching = true;
    },
    [patchBlogCommunityDB.fulfilled]: (state, action) => {
      // state.blogList = action.payload;
      state.blogList.push(action.payload);

      state.isFetching = false;
      state.errorMessage = null;
    },
    [patchBlogCommunityDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errerMessage;
    },

    //블로그 게시글 삭제
    [deleteBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [deleteBlogCommentDB.fulfilled]: (state, action) => {
      state.blogList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBlogCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errerMessage;
    },

    //댓글 조회 부분
    [getBlogCommentListDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogCommentListDB.fulfilled]: (state, action) => {
      //같은 포스트아이디에 comment리스트
      state.commentList = action.payload;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [getBlogCommentListDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    //댓글 추가 부분
    [postBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [postBlogCommentDB.fulfilled]: (state, action) => {
      state.commentList.push(action.payload.data);
      state.isFetching = false;

      // state.commentList = action.payload.data;
      state.errorMessage = null;
    },
    [postBlogCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //댓글 수정 부분
    [patchBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [patchBlogCommentDB.fulfilled]: (state, action) => {
      const idx = state.commentList.findIndex(data => {
        return data.id === action.payload.data.id;
      });
      state.commentList[idx] = [
        {
          ...state.commentList[idx],
          comment: action.payload.data,
        },
      ];
      state.isFetching = false;
      state.errorMessage = null;
    },
    [patchBlogCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //댓글 삭제 부분
    [deleteBlogCommentDB.pending]: state => {
      state.isFetching = true;
    },
    [deleteBlogCommentDB.fulfilled]: (state, action) => {
      const idxx = state.commentList.filter(data => data.id !== action.payload);
      state.commentList = idxx;
      state.isFetching = false;
      state.errorMessage = null;
    },
    [deleteBlogCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //마이블로그 조회
    [getMyBlogDB.pending]: state => {
      state.isFetching = true;
    },
    [getMyBlogDB.fulfilled]: (state, action) => {
      state.myblog = action.payload;

      state.isFetching = false;
      state.errorMessage = null;
    },
    [getMyBlogDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    // 북마크 조회
    [getBlogBookMarkDB.pending]: state => {
      state.isFetching = true;
    },
    [getBlogBookMarkDB.fulfilled]: (state, action) => {
      console.log(action.type);
      state.type = action.type;
      state.blogBookMark = action.payload;
    },
    [getBlogBookMarkDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 북마크 추가
    [postBookmarkListDB.pending]: state => {
      state.isFetching = true;
    },
    [postBookmarkListDB.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.blogBookMark = action.payload;
    },
    [postBlogCommentDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },
    //북마크 삭제
    [deleteBlogBookMarkDB.pending]: state => {
      state.isFetching = true;
    },
    [deleteBlogBookMarkDB.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.blogBookMark = action.payload;
    },
    [deleteBlogBookMarkDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    //추천 많이 받은 블로그
    [getHotBlogDB.pending]: state => {
      state.isFetching = true;
    },
    [getHotBlogDB.fulfilled]: (state, action) => {
      state.hotBlog = action.payload;
    },
    [getHotBlogDB.rejected]: (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload.errorMessage;
    },

    // 좋아요 추가
    [postBlogLikeDB.pending]: state => {
      state.isFetching = true;
    },
    [postBlogLikeDB.fulfilled]: (state, action) => {
      state.blogDetail = action.payload;
    },
    [postBlogLikeDB.rejected]: (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    },

    // // 좋아요 삭제
    // [deleteBlogBookMarDB]: state => {
    //   state.isFetching = true;
    // },
    // [deleteBlogBookMarDB]
  },
});

export const {} = blogSlice.actions;
export default blogSlice.reducer;
