import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../common/Editor";
import { deleteCommentListDB, getCommentListDB } from "./../../redux/async/qna";

const QnaCommentList = ({ qnaId }) => {
  const dispatch = useDispatch();

  //commentList 구독
  const a = useSelector(state => state.qnaSlice.commentList);

  useEffect(() => {
    dispatch(getCommentListDB(qnaId));
  }, [qnaId]);

  const onDeleteHandler = id => {
    dispatch(deleteCommentListDB(id));
  };

  const onEditHandler = id => {};

  return (
    <>
      <div className="ql-snow">
        {a.map(data => (
          <div key={data.id}>
            <div className="ql-editor">
              <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
            </div>
            <button
              onClick={() => {
                onDeleteHandler(data.id);
              }}
            >
              삭제하기
            </button>
            <button
              onClick={() => {
                onEditHandler(data.id);
              }}
            >
              수정하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QnaCommentList;
