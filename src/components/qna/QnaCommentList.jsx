import { legacy_createStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Editor from "../common/Editor";
import { successAlert, errorAlert } from "./../../utils/swal";
import {
  choiceCommentListDB,
  deleteCommentListDB,
  getCommentListDB,
  getOneQnaListDB,
  likeCommentListDB,
  dislikeCommentListDB,
} from "./../../redux/async/qna";

const QnaCommentList = ({ author, resolve, id, qnaId }) => {
  const dispatch = useDispatch();

  //commentList 구독
  const list = useSelector(state => state.qnaSlice.commentList);
  const { isLogin } = useSelector(state => state.userSlice);
  //로그인 유저 이름 구독
  const userName = useSelector(state => state.userSlice.userName);
  //최초진입시 commentList 받아오기
  useEffect(() => {
    dispatch(getCommentListDB(id));
  }, [id]);

  //코멘트 삭제 dispatch
  const onDeleteHandler = id => {
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }
    dispatch(deleteCommentListDB(id));
  };

  //댓글 추천
  const onLikeHandler = id => {
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }
    dispatch(likeCommentListDB(id));
  };

  //댓글 추천 취소
  const onDisLikeHandler = id => {
    dispatch(dislikeCommentListDB(id));
  };

  console.log(list);

  const onChoiceHandler = id => {
    Swal.fire({
      title: "채택 하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then(res => {
      if (res.isConfirmed) {
        dispatch(choiceCommentListDB({ id, qnaId, userName }));
      } else if (res.isDenied || res.isDismissed) {
        errorAlert("취소 하셨습니다.");
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
            {/* 유저이름과 작성자이름이 같고 채택이 없을때 삭제 가능 */}
            {userName === data.user_name && !resolve && (
              <button
                onClick={() => {
                  onDeleteHandler(data.id);
                }}
              >
                삭제하기
              </button>
            )}
            {data.is_honey_tip ? (
              <button
                onClick={() => {
                  onDisLikeHandler(data.id);
                }}
              >
                추천취소
              </button>
            ) : (
              <button
                onClick={() => {
                  onLikeHandler(data.id);
                }}
              >
                추천하기
              </button>
            )}
            {/* 글작성자와 유저이름이 같고 채택이 없을때 채택 가능 */}
            {author === userName && !resolve && (
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
