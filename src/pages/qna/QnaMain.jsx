import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getQnaListDB } from "./../../redux/async/qna";

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQnaListDB());
  }, [dispatch]);

  const qnaList = useSelector(state => state.qnaSlice.qnaList);

  return (
    <StextMain qnaList={qnaList}>
      {qnaList &&
        qnaList.map(data => {
          return (
            <div className="ql-snow" key={data.id}>
              <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
              <button
                onClick={() => {
                  navigate(`/qna/edit/${data.id}`);
                }}
              >
                수정하기
              </button>
            </div>
          );
        })}
    </StextMain>
  );
};

export default QnaMain;

const StextMain = styled.div`
  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;
