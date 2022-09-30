import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

//컴포넌트
import ModalBookmark from "../../components/common/ModalBookmark";
import Editor from "../../components/common/EditorComponent";

//이미지
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";

const QnaWrite = () => {
  return (
    <SQnaWrite>
      <Helmet>
        <title>QNA Write</title>
      </Helmet>
      <SEditor>
        <h2 className="title">새 질문 작성하기</h2>
        <Editor className="editor" isWrite={true} />
      </SEditor>
      <ModalBookmark isWrite={true} />
    </SQnaWrite>
  );
};

export default QnaWrite;

const SQnaWrite = styled.div`
  min-width: 1300px;
  display: flex;
  width: 100%;
  min-height: calc(100vh - 100px);
`;

const SEditor = styled.div`
  padding-left: 200px;
  padding-right: 150px;
  flex: 1;
  & .title {
    margin-top: 40px;
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: 600;
    background-image: url(${QnaWriteIcon});
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 38px;
  }
`;
