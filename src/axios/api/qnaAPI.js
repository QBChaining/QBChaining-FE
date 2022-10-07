import instance from "../axios";

export const qnaApi = {
  //게시글 채택 조회
  getQnaMainList: data =>
    instance.get(
      `/qna?page_count=10&page=${data.pageNumber}&resolve=${data.isResolve}`,
    ),
  //게시글 카테고리 조회
  getCategoryList: data =>
    instance.get(
      `/qna/categories/${data.category}?page_count=10&page=${data.pageNumber}&resolve=${data.isResolve}`,
    ),

  //게시글 상세조회
  getOneList: id => instance.get(`/qna/${id}`),

  //핫게시글 조회
  getQnaHotList: () => instance.get("/qna/hot"),

  //게시글 작성
  postList: data => instance.post("/qna", data),

  //게시글 수정
  editList: data => instance.put(`/qna/${data.id}`, data),

  //게시글 즐겨찾기 조회
  getBookmarkList: () => instance.get("/qna/bookmark?page_count=10&page=0"),

  //게시글 즐겨찾기 추가
  postBookmarkList: data => instance.post(`/qna/${data.id}/bookmark`),

  //게시글 즐겨찾기 삭제
  deleteBookmarkList: data => instance.delete(`/qna/${data.id}/bookmark`),

  //게시글 추천목록 조회
  getQnaLikeList: () => instance.get(`qna/like`),

  //게시글 추천
  likeQnaList: data => instance.post(`qna/${data.id}/like`),

  //게시글 추천 취소
  dislikeQnaList: data => instance.delete(`qna/${data.id}/like`),

  //댓글 조회
  getCommentList: data =>
    instance.get(
      `/qna/${data.id}/comments?page_count=10&page=${data.pageNumber}`,
    ),

  //댓글 작성
  postCommentList: data =>
    instance.post(`/qna/${data.id}/comments`, { comment: data.content }),

  //댓글 삭제
  deleteCommentList: id => instance.delete(`/qna/comments/${id}`),

  //댓글 수정
  editCommentList: data => instance.edit(`/qna/comments/${data.id}`, data),

  //댓글 추천
  likeCommentList: (commentId, id) =>
    instance.post(`/qna/comments/${commentId}/like`),

  //댓글 추천
  dislikeCommentList: (commentId, id) =>
    instance.delete(`/qna/comments/${commentId}/like`),

  //댓글 채택
  choiceCommentList: data => instance.post(`/qna/comments/${data.id}/choice`),
};
