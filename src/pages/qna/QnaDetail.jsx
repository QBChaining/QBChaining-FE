import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneQnaListDB } from "../../redux/async/qna";
import { colorSetGrad } from "../../redux/modules/userSlice";
import QnaList from "./../../components/qna/QnaList";
import QnaCommentList from "./../../components/qna/QnaCommentList";
import QnaTarget from "../../components/qna/QnaTarget";
import styled from "styled-components";
import ModalBookmark from "./../../components/common/ModalBookmark";
import QnaWriteArrow from "../../assets/images/QnaWriteArrow.png";
import Editor from "./../../components/common/Editor";

const QnaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const target = useSelector(state => state.qnaSlice.qnaTarget);

  useEffect(() => {
    dispatch(getOneQnaListDB(id));
    dispatch(colorSetGrad());
  }, [dispatch, id]);

  return (
    <SQnaDetail>
      <SLeftContainer QnaWriteArrow={QnaWriteArrow}>
        <QnaTarget isDatail={true} data={target} />
        <QnaCommentList
          author={target.user?.user_name}
          resolve={target.is_resolve}
          id={id}
          qnaId={id}
        />
      </SLeftContainer>
      <SRightContainer>
        <SAddCommentTitle>댓글 작성</SAddCommentTitle>
        <Editor isCommentWrite={true} id={id} />
      </SRightContainer>
      <ModalBookmark />
    </SQnaDetail>
  );
};

export default QnaDetail;

const SQnaDetail = styled.div`
  display: flex;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
`;

const SLeftContainer = styled.div`
  width: 50%;
  padding-left: 200px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50px;
    right: -50px;
    width: 53px;
    height: 53px;
    background-image: url(${props => props.QnaWriteArrow});
    background-repeat: no-repeat;
  }
`;

const SRightContainer = styled.div`
  padding: 0 200px 0 50px;
  width: 50%;
  background-color: ${props => props.theme.color.mainGreen};
  color: white;
`;

const SAddCommentTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  padding: 60px 0 30px 0;
`;
