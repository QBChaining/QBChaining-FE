import instance from "../axios";

export const blogApi = {
  //블로그 커뮤니티
  //블로그 메인 게시글 조회
  getBlogCommunityList: () => instance.get("/posts"),

  //블로그 디테일 조회
  getBlogDetail: postId => instance.get(`/posts/${postId}`),

  //블로그 게시글 생성
  poastBlogCommunity: data => instance.post("/posts", data),

  //블로그 게시물 수정
  editBlogCommunity: data => instance.put(`/posts/${data.id}`, data),

  //블로그 댓글
  getBlogCommentList: postId => instance.get(`/comments/${postId}`),
  postBlogComment: (postId, data) => instance.post(`comments/${postId}`, data),
  patchBlogComment: data => instance.patch("/comments", data),
  DeleteBlogComment: data => instance.delete(`/comments/${data.id}`, data),
};
