import instance from "../axios";

export const searchApi = {
  //qna게시글 검색결과 조회
  getQnaSearchList: (data: { word: string; endid: number }) =>
    instance.get(
      `/qna/search?q=${data.word}&page_count=10&endid=${data.endid}`,
    ),
  //블로그 게시글 검색결과 조회
  getBlogSearchList: (data: { word: string; endid: number }) =>
    instance.get(
      `/posts/search?q=${data.word}&page_count=10&endid=${data.endid}`,
    ),
};
