import React, { useRef, useState } from "react";
import { ref } from "firebase/storage";
import Editor from "./../common/Editor";

const QnaAddComment = ({ id }) => {
  const style = { height: "300px" };
  return (
    <>
      <Editor isCommentWrite={true} id={id} style={style} />
    </>
  );
};

export default QnaAddComment;
