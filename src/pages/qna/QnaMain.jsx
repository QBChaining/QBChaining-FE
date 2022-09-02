import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getQnaListDB } from "./../../redux/async/qna";
import QnaList from "./../../components/qna/QnaList";

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qnaList = useSelector(state => state.qnaSlice.qnaList);

  //최초진입시 qnalistdb 요청
  useEffect(() => {
    dispatch(getQnaListDB());
  }, []);

  return (
    <StextMain>
      {qnaList.map(data => (
        <QnaList data={data} key={data.id} />
      ))}
    </StextMain>
  );
};

export default QnaMain;

const StextMain = styled.div`
  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;
