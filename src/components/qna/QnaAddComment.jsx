import React, { useRef, useState } from "react";
import { ref } from "firebase/storage";
import Editor from "./../common/Editor";

const QnaAddComment = ({ qnaId }) => {
  const style = { height: "300px" };
  return (
    <>
      <Editor isCommentWrite={true} qnaId={qnaId} style={style} />
    </>
  );
};

export default QnaAddComment;
