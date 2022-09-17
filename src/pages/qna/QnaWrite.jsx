import React, { useEffect, useState } from "react";
import Editor from "../../components/common/EditorComponent";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";
import ModalBookmark from "../../components/common/ModalBookmark";
import { useDispatch } from "react-redux";
import { colorSetGreen } from "../../redux/modules/userSlice";

const QnaWrite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(colorSetGreen());
  }, []);

  return (
    <SQnaWrite>
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
