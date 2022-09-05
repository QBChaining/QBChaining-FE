import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../common/Editor";
import { deleteCommentListDB, getCommentListDB } from "./../../redux/async/qna";

const QnaCommentList = ({ id }) => {
  const dispatch = useDispatch();

  //commentList 구독
  const list = useSelector(state => state.qnaSlice.commentList);

  //최초진입시 commentList 받아오기
  useEffect(() => {
    dispatch(getCommentListDB(id));
  }, [id]);

  //코멘트 삭제 dispatch
  const onDeleteHandler = id => {
    dispatch(deleteCommentListDB(id));
  };

  return (
    <>
      <div className="ql-snow">
        {list.map(data => (
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
          </div>
        ))}
      </div>
    </>
  );
};

export default QnaCommentList;
