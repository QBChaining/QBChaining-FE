import instance from "../axios";

export const qnaApi = {
  getList: () => instance.get("/qna"),
  getOneList: id => instance.get(`/qna?id=${id}`),
  postList: data => instance.post("/qna", data),
  editList: data => instance.put(`/qna/${data.id}`, data),
  // getCommentList:(id)=>instance.get(`qna/comment/${id}`),
  getCommentList: id => instance.get(`/comments?qnaId=${id}`),
  postCommentList: data => instance.post(`/comments`, data),
};
