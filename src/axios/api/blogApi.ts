import instance from "../axios";

export const blogApi = {
  //---블로그 커뮤니티---

  //블로그 메인 게시글 조회
  getBlogCommunityList: (data: number) =>
    instance.get(`posts?page=${data}&page_count=10`),
  // getBlogCommunityList: () => instance.get(`posts?page=0&page_count=10`),
  //블로그 디테일 조회
  getBlogDetail: (id: number) => instance.get(`/posts/${id}`),
  // 블로그 미리보기
  getPreView: (id: number) => instance.get(`/posts/${id}`),
  //블로그 게시글 생성
  postBlogCommunity: (data: any) => instance.post("/posts", data),
  //블로그 게시물 수정
  editBlogCommunity: (data: any) => instance.put(`/posts/${data.id}`, data),
  //블로그 게시물 삭제
  deleteBlogCommunity: (id: number) => instance.delete(`/posts/${id}`),

  //---블로그 댓글---

  //댓글 조회
  getBlogCommentList: (id: number) => instance.get(`/comments/${id}`),
  //댓글 추가
  postBlogComment: (data: any) => instance.post(`/comments/${data.id}`, data),
  //댓글 수정
  patchBlogComment: (data: any) => instance.put(`/comments/${data.id}`, data),
  //댓글 삭제
  DeleteBlogComment: (id: number) => instance.delete(`/comments/${id}`),

  //---마이블로그---
  //마이블로그 조회
  getMyBlog: (id: number) => instance.get(`/posts/my/${id}`),
  //유저마이블로그 조회
  getYouBlog: (id: number) => instance.get(`/posts/you/${id}`),

  //---블로그 게시글 북마크---
  //블로그 북마크 조회
  getBlogBookMark: () => instance.get(`/posts/bookmark/`),
  //블로그 북마크 추가
  postBlogBookMark: (data: { id: number }) =>
    instance.post(`/posts/bookmark/${data.id}`),
  //블로그 북마크  삭제
  delBlogBookMark: (id: number) => instance.delete(`/posts/bookmark/${id}`),

  // ---블로그 게시글 좋아요---
  //블로그추천(좋아요)
  postBlogLike: (id: number) => instance.post(`/posts/like/${id}`),
  //블로그 추천삭제(좋아요삭제)
  unBlogLike: (id: number) => instance.delete(`/posts/like/${id}`),
  // 추천 많이 받은 블로그 조회
  getHotBlog: () => instance.get(`/posts/hits`),

  // ---댓글 좋아요---
  // 댓글 좋아요 추가
  postCommentLike: (id: number) => instance.post(`/comments/like/${id}`),
  // 댓글 좋아요 삭제
  delCommentLike: (id: number) => instance.delete(`/comments/like/${id}`),
};
