import React from "react";
import PrepareIcon from "../assets/images/PrepareIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Preparing = () => {
  const navigate = useNavigate();
  return (
    <SPreparing>
      <SIcon />
      <h2>준비중인 서비스입니다.</h2>
      <p>불편을 드려 죄송합니다. 금방 정상화 됩니다!</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        메인으로 돌아가기
      </button>
    </SPreparing>
  );
};

export default Preparing;

const SPreparing = styled.div`
  width: 100vw;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h2 {
    padding-top: 35px;
    font-size: 30px;
    font-weight: 500;
  }

  & p {
    font-size: 20px;
    color: ${props => props.theme.color.grey6};
  }

  & button {
    margin-top: 50px;
    padding: 10px 65px;
    background: ${props => props.theme.color.mainNavy};
    color: ${props => props.theme.color.white};
    font-size: 20px;
    border-radius: 30px;
    border: none;
    transition: 0.3s;

    &:hover {
      background: ${props => props.theme.color.mainOrange};
    }
  }
`;

const SIcon = styled.div`
  width: 304px;
  height: 227px;
  position: relative;
  right: 65px;
  background-image: url(${PrepareIcon});
`;
