import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkListDB, postBookmarkListDB } from "../../redux/async/qna";
import { deleteBookmarkListDB } from "./../../redux/async/qna";
import Swal from "sweetalert2";

const QnaTarget = ({ data, isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const isBookmarked =
    bookmarkList.filter(mark => mark.qna_id === data.id).length > 0;

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

  useEffect(() => {
    dispatch(getBookmarkListDB());
  }, []);

  return (
    <SQnaTarget>
      <div>
        <div>
          {/* <button onClick={bookmark ? onDeleteBookmark : onAddBookmark}>
            {bookmark ? "즐겨찾기삭제" : "즐겨찾기"}
          </button> */}
          {isBookmarked ? (
            <button onClick={onDeleteBookmark}>즐겨찾기삭제</button>
          ) : (
            <button onClick={onAddBookmark}>즐겨찾기</button>
          )}
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
