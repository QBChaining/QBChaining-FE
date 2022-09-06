import React, { useRef, useState } from "react";
import { ref } from "firebase/storage";
import Editor from "./../common/Editor";
import styled from "styled-components";

const QnaAddComment = ({ id }) => {
  const style = { height: "300px" };

  return (
    <SQnaAddComment>
      <Editor isCommentWrite={true} id={id} style={style} />
    </SQnaAddComment>
  );
};

export default QnaAddComment;

const SQnaAddComment = styled.div`
  color: black;
`;
