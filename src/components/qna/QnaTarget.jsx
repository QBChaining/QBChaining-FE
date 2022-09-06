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

const QnaTarget = ({ data, isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
  //내 북마크 목록에 있는지 확인
  const isBookmarked =
    bookmarkList.filter(mark => mark.qna_id === data.id).length > 0;

  //내 좋아요 목록에 있는지 확인
  // const isliked =
  //   likeList.filter(mark => mark.qna_id === data.id).length > 0;

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
    successAlert("즐겨찾기에 추가 되었습니다.");
  };

  //즐겨찾기 삭제
  const onDeleteBookmark = () => {
    dispatch(deleteBookmarkListDB(totalId));
    errorAlert("즐겨찾기에 삭제 되었습니다.");
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
        <div>
          {isBookmarked ? (
            <button onClick={onDeleteBookmark}>즐겨찾기삭제</button>
          ) : (
            <button onClick={onAddBookmark}>즐겨찾기</button>
          )}
        </div>
        <div>
          <button onClick={onLikeQna}>게시글 추천</button>
        </div>
        <div>
          <div>{data.user?.user_name}</div>
          <div>{data.createdAt}</div>
        </div>
        <div className="ql-snow">
          <div>{data.title}</div>
          {isDatail && (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: data.content }}
            ></div>
          )}
        </div>
        <div>
          <div>{data.category}</div>
          <div>{data.honeytip}</div>
          <div>
            {data.tag?.map((data, i) => {
              return <div key={i}>{data}</div>;
            })}
          </div>
        </div>
      </div>
    </SQnaTarget>
  );
};
export default QnaTarget;

const SQnaTarget = styled.div`
  & .ql-snow .ql-editor {
    background-color: white;
  }
  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;
