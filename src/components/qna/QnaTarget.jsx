import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkListDB, postBookmarkListDB } from "../../redux/async/qna";
import { deleteBookmarkListDB } from "./../../redux/async/qna";
import Swal from "sweetalert2";
import { axios } from "axios";

const QnaTarget = ({ data, isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
  //내 북마크 목록에 있는지
  const isBookmarked =
    bookmarkList.filter(mark => mark.qna_id === data.id).length > 0;

  console.log(isBookmarked);
  console.log(isLogin);
  const bookData = {
    qna_id: data.id,
    Qna: { title: data.title },
  };

  const onAddBookmark = () => {
    dispatch(postBookmarkListDB(bookData));
    Swal.fire("즐겨찾기", "즐겨찾기에 추가되었습니다.", "success");
  };

  const onDeleteBookmark = () => {
    dispatch(deleteBookmarkListDB(bookData));
    Swal.fire("즐겨찾기", "즐겨찾기에 삭제되었습니다.", "error");
  };

  const onLikeQna = () => {};

  const onDislikeQna = () => {};

  useEffect(() => {
    if (isLogin) {
      dispatch(getBookmarkListDB());
    }
  }, []);

  return (
    <SQnaTarget>
      <div>
        <div>
          {isLogin ? (
            isBookmarked ? (
              <button onClick={onDeleteBookmark}>즐겨찾기삭제</button>
            ) : (
              <button onClick={onAddBookmark}>즐겨찾기</button>
            )
          ) : null}
        </div>
        <div>
          <button onClick={onLikeQna}>게시글 추천</button>
          <button onClick={onDislikeQna}>게시글 추천취소</button>
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
