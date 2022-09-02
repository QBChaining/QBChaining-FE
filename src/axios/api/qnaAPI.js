import instance from "../axios";

export const qnaApi = {
  //게시글 조회
  getList: () => instance.get("/qna"),
  //게시글 상세조회
  getOneList: id => instance.get(`/qna/${id}`),
  //게시글 작성
  postList: data => instance.post("/qna", data),
  //게시글 수정
  editList: data => instance.put(`/qna/${data.id}`, data),
  //게시글 즐겨찾기
  postBookmarkList: data => instance.put(`/qna/${data.id}`, data),
  //댓글 조회
  getCommentList: id => instance.get(`/qna/${id}/comments`),
  //댓글 작성
  postCommentList: data =>
    instance.post(`/qna/${data.id}/comments`, data.content),
  //댓글 삭제
  deleteCommentList: id => instance.delete(`/comments/${id}`),
  //댓글 수정
  editCommentList: data => instance.eidt(`/comments/${data.id}`, data),
};
