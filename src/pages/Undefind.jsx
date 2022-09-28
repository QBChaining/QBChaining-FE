import React from "react";
import PrepareIcon from "../assets/images/PrepareIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Undefind = () => {
  const navigate = useNavigate();
  return (
    <SUndefind>
      <SIcon />
      <h2>죄송합니다.</h2>
      <p>해당 페이지를 찾을 수 없습니다.</p>
      <button
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        메인으로 돌아가기
      </button>
    </SUndefind>
  );
};

export default Undefind;

const SUndefind = styled.div`
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
