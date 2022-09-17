import instance from "../axios";

export const searchApi = {
  //qna게시글 검색결과 조회
  getQnaSearchList: word =>
    instance.get(`/qna/search?q=${word}&page_count=10&page=0`),

  //블로그 게시글 검색결과 조회
  getBlogSearchList: word =>
    instance.get(`/posts/search?q=${word}&page_count=10&page=0`),
};
