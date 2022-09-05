import instance from "../axios";

export const blogApi = {
  //블로그 커뮤니티
  //블로그 메인 게시글 조회
  getBlogCommunityList: () => instance.get("/posts"),

  //블로그 디테일 조회
  getBlogDetail: id => instance.get(`/posts/${id}`),

  //블로그 게시글 생성
  poastBlogCommunity: data => instance.post("/posts", data),

  //블로그 게시물 수정
  editBlogCommunity: data => instance.put(`/posts/${data.id}`, data),

  //블로그 댓글
  // getBlogCommentList: postId => instance.get(`/comments/${postId}`),
  //댓글 조회
  getBlogCommentList: id => instance.get(`/comments/${id}`),
  //댓글 추가
  postBlogComment: (id, data) => instance.post(`/comments/${id}`, data),
  //댓글 수정
  patchBlogComment: data => instance.patch("/comments", data),
  //댓글 삭제
  DeleteBlogComment: data => instance.delete(`/comments/${data.id}`, data),
};
