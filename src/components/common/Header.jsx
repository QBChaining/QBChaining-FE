import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  const loginApi = async () => {
    try {
      const response = await axios.get("http://13.124.114.140/api/auth/github");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // http://13.124.114.140/
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
          <li
            onClick={() => {
              navigate("/register");
            }}
          >
            레지스터
          </li>
          <li onClick={loginApi}>로그인</li>
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
