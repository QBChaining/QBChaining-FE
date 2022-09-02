import instance from "../axios";

export const blogApi = {
  //블로그 커뮤니티
  getBlogCommunityList: () => instance.get("/posts"),
  poastBlogCommunity: data => instance.get("/posts", data),
  editBlogCommunity: data => instance.put(`/boards/${data.id}`, data),
  //블로그 댓글
  getBlogCommentList: () => instance.get("/comments"),
  postBlogComment: data => instance.post("/comments", data),
  patchBlogComment: commentId => instance.patch("/comments", commentId),
  DeleteBlogComment: data => instance.delete(`/comments/${data.id}`, data),
};
