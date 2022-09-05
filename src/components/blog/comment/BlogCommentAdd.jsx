import React from "react";
import { useDispatch } from "react-redux";
// import styled from "styled-components";
import { postBlogCommentDB } from "../../../redux/async/blog.js";
import { useParams } from "react-router-dom";
const CommentAdd = () => {
  const dispatch = useDispatch();
  const commentRefInput = React.useRef();
  const { postId } = useParams();
  //댓글 추가 이벤트
  const addComment = () => {
    dispatch(
      postBlogCommentDB({
        comment: commentRefInput.current.value,
        postId,
      }),
    );
  };

  return (
    <form>
      <input
        type="text"
        ref={commentRefInput}
        placeholder={"20자이하"}
        maxLength="20"
      />

      <button
        onClick={() => {
          addComment();
        }}
      >
        추가하기
      </button>
    </form>
  );
};

export default CommentAdd;
