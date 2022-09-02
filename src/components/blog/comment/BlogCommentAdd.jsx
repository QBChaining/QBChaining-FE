import React from "react";
import { useDispatch } from "react-redux";
// import styled from "styled-components";
import { postBlogCommentDB } from "../../../redux/async/blog.js";

const CommentAdd = () => {
  const dispatch = useDispatch();
  //댓글 이벤트
  const commentRefInput = React.useRef();
  //서버 연결하고 지울것.
  const [commentId, setCommmentId] = React.useState(1);
  //--------그리고 mockapi 설정법 알아보기
  const postId = 1;
  const addComment = () => {
    console.log(commentId);
    dispatch(
      postBlogCommentDB({
        comment: commentRefInput.current.value,
        postId,
        commentId,
      }),
    );
    // commentRefInput.current.value = "";
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
          setCommmentId(commentId + 1);
          addComment();
        }}
      >
        추가하기
      </button>
    </form>
  );
};

export default CommentAdd;
