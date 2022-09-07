import React, { useEffect, useState } from "react";
import Editor from "../../components/common/Editor";
import { useForm } from "react-hook-form";
import axios from "axios";
import BookmarkList from "./../../components/common/BookmarkList";
import styled from "styled-components";

const QnaWrite = () => {
  return (
    <SQnaWrite>
      <SEditor>
        <h2 className="title">질문글 업로드</h2>
        <Editor className="editor" isWrite={true} />
      </SEditor>
      <SBookmark>
        <BookmarkList />
      </SBookmark>
    </SQnaWrite>
  );
};

export default QnaWrite;

const SQnaWrite = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 100px);
`;

const SEditor = styled.div`
  margin-left: 100px;
  margin-right: 170px;
  flex: 1;
  & .title {
    margin-top: 67px;
    margin-bottom: 41px;
    font-size: 36px;
    font-weight: 400;
  }
`;

const SBookmark = styled.div`
  width: 35%;
  background-color: #1c2030;
`;
