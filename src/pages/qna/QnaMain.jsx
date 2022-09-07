import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getQnaListDB } from "./../../redux/async/qna";
import QnaList from "./../../components/qna/QnaList";
import QnaMainCatergory from "./../../components/qna/QnaMainCatergory";
import ModalBookmark from "../../components/common/ModalBookmark";

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qnaList = useSelector(state => state.qnaSlice.qnaList);

  //최초진입시 qnalistdb 요청
  useEffect(() => {
    dispatch(getQnaListDB());
  }, []);

  return (
    <SQnaMain>
      <SMainCategory>
        <QnaMainCatergory />
      </SMainCategory>
      <button
        onClick={() => {
          navigate("/qna/write");
        }}
      >
        글쓰기
      </button>
      <SQnaWrapper>
        <SleftConatiner>
          {qnaList.map(data => (
            <QnaList data={data} key={data.id} />
          ))}
        </SleftConatiner>
        <SRightContainer></SRightContainer>
      </SQnaWrapper>
      <ModalBookmark />
    </SQnaMain>
  );
};

export default QnaMain;

const SQnaMain = styled.div`
  max-width: calc(100% - 400px);
  margin: 0 auto;
`;
const SMainCategory = styled.div``;

const SQnaWrapper = styled.div`
  display: flex;
`;
const SleftConatiner = styled.div`
  max-width: 940px;
  width: 100%;
  margin-right: 58px;
`;

const SRightContainer = styled.div`
  position: sticky;
  top: 20px;
  left: 0;
  max-width: 522px;
  width: 100%;
  height: 318px;
  background-color: #d9d9d9;
`;
