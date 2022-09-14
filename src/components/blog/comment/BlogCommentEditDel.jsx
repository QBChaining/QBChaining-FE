import React, { useState, useRef } from "react";
import styled from "styled-components";
import {
  patchBlogCommentDB,
  deleteBlogCommentDB,
} from "../../../redux/async/blog";
import { useDispatch, useSelector } from "react-redux";

const CommentEditDel = ({ comments }) => {
  // console.log(user);
  const [show, setShow] = useState(false);
  const editRef = useRef();

  const dispatch = useDispatch();

  //댓글 수정 완료 버튼
  const onClickEditHandler = () => {
    dispatch(
      patchBlogCommentDB({
        comment: editRef.current.value,
        id: comments.id,
      }),
    );
  };

  //댓글 삭제 버튼
  const onClickDeleteHandler = e => {
    e.preventDefault();
    dispatch(deleteBlogCommentDB(comments.id));
  };

  return (
    <div>
      {!show ? (
        <SCommentList>
          <div>프로필사진</div>
          <div>홍길동</div>
          <div>👍</div>
          <small>{comments.comment}</small>

          <div>
            <button
              type="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              수정
            </button>
            <button onClick={onClickDeleteHandler}>삭제</button>
          </div>
        </SCommentList>
      ) : (
        <>
          <div>프로필사진</div>
          <div>홍길동</div>
          <div>👍</div>
          <input type="text" placeholder={comments.comment} ref={editRef} />
          <div>
            <button
              onClick={() => {
                onClickEditHandler(comments.id);
                setShow(!show);
              }}
            >
              수정완료
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const SCommentList = styled.div``;
export default CommentEditDel;
