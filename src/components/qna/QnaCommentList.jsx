import { legacy_createStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Editor from "../common/Editor";
import {
  choiceCommentListDB,
  deleteCommentListDB,
  getCommentListDB,
  getOneQnaListDB,
  likeCommentListDB,
} from "./../../redux/async/qna";

const QnaCommentList = ({ resolve, id, qnaId }) => {
  const dispatch = useDispatch();

  //commentList 구독
  const list = useSelector(state => state.qnaSlice.commentList);
  //로그인 유저 이름 구독
  const userName = useSelector(state => state.userSlice.userName);
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
    Swal.fire({
      title: "채택 하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire("채택하셨습니다", "", "success");
        dispatch(choiceCommentListDB({ id, qnaId }));
      }
    });
  };

  return (
    <>
      <div className="ql-snow">
        {list.map(data => (
          <div key={data.id}>
            <div>{data.user_name}</div>
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
            {!resolve && data.user_name === userName && (
              <button
                onClick={() => {
                  onChoiceHandler(data.id);
                }}
              >
                채택하기
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default QnaCommentList;
