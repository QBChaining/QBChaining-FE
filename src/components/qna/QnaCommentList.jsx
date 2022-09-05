import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../common/Editor";
import {
  choiceCommentListDB,
  deleteCommentListDB,
  getCommentListDB,
  likeCommentListDB,
} from "./../../redux/async/qna";

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

  const onLikeHandler = id => {
    dispatch(likeCommentListDB(id));
  };

  const onChoiceHandler = id => {
    dispatch(choiceCommentListDB(id));
  };

  console.log(list);

  return (
    <>
      <div className="ql-snow">
        {list.map(data => (
          <div key={data.id}>
            <div className="ql-editor">
              <div dangerouslySetInnerHTML={{ __html: data.comment }}></div>
            </div>
            <div>{data.honey_tip}</div>
            <button
              onClick={() => {
                onDeleteHandler(data.id);
              }}
            >
              삭제하기
            </button>
            <button
              onClick={() => {
                onLikeHandler(data.id);
              }}
            >
              추천하기
            </button>
            <button
              onClick={() => {
                onChoiceHandler(data.id);
              }}
            >
              채택하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default QnaCommentList;
