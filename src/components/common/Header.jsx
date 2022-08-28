import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  return (
    <SHeader>
      <nav>
        <ul>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            홈으로
          </li>
          <li
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </li>
          <li
            onClick={() => {
              navigate("/blog");
            }}
          >
            블로그
          </li>
          <li
            onClick={() => {
              navigate("/qna");
            }}
          >
            QNA
          </li>
          <li
            onClick={() => {
              navigate("/qna/write");
            }}
          >
            QNA쓰기
          </li>
        </ul>
      </nav>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  & ul {
    display: flex;
    justify-content: center;
  }
  & li {
    margin: 20px 20px;
    cursor: pointer;
  }
`;
