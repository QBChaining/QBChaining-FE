import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeQnaListDB,
  getBookmarkListDB,
  likeQnaListDB,
  postBookmarkListDB,
} from "../../redux/async/qna";
import { deleteBookmarkListDB } from "./../../redux/async/qna";
import { errorAlert, needLoginAlert } from "../../utils/swal";
import { successAlert } from "./../../utils/swal";

import ToastViewer from "../editor/ToastViewer";

const QnaTarget = ({ data, isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
  //내 즐겨찾기 목록에 있는지 확인
  const isBookmarked =
    bookmarkList.filter(mark => mark.qna_id === data.id).length > 0;

  const totalId = {
    qna_id: data.id,
    Qna: { title: data.title },
  };

  //즐겨찾기 추가
  const onAddBookmark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBookmarkListDB(totalId));
  };

  //즐겨찾기 삭제
  const onDeleteBookmark = () => {
    dispatch(deleteBookmarkListDB(totalId));
  };

  //게시글 추천
  const onLikeQna = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(likeQnaListDB(totalId));
  };

  //게시글 추천 취소
  const onDislikeQna = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(dislikeQnaListDB(totalId));
  };

  //최초진입시 get요청
  useEffect(() => {
    if (isLogin) {
      dispatch(getBookmarkListDB());
      // dispatch(getQnaLikeListDB())
    }
  }, []);

  return (
    <SQnaTarget>
      <div>
        {isBookmarked ? (
          <button onClick={onDeleteBookmark}>즐겨찾기삭제</button>
        ) : (
          <button onClick={onAddBookmark}>즐겨찾기</button>
        )}
      </div>
      <div>
        {data.is_honey_tip ? (
          <button onClick={onDislikeQna}>게시글 추천취소</button>
        ) : (
          <button onClick={onLikeQna}>게시글 추천</button>
        )}
      </div>
      <div>
        <div>유저이름 : {data.user?.user_name}</div>
        <div>생성날짜 : {data.createdAt}</div>
      </div>
      <div>제목 : {data.title}</div>
      <ToastViewer content={data.content} />
      <div>
        <div>카테고리 : {data.category}</div>
        <div>추천수 : {data.honeytip}</div>
        <div>
          {data.tag?.map((data, i) => {
            return <div key={i}>{data}</div>;
          })}
        </div>
      </div>
    </SQnaTarget>
  );
};

export default QnaTarget;

const SQnaTarget = styled.div``;
