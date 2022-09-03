import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();

  // const loginApi = () => {
  //   try {
  //     axios.get("http://13.124.114.140/api/auth/github").then(res => {
  //       console.log(res);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // http://13.124.114.140/
  return (
    <SHeader>
      <div className="logoContainer">
        <h1>logo</h1>
      </div>
      <nav>
        <ul>
          <li
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </li>
          <li
            onClick={() => {
              navigate("/");
            }}
          >
            랭킹
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
              navigate("/blog");
            }}
          >
            블로그
          </li>
        </ul>
      </nav>
      <div className="searchContainer">
        <input type="text" />
        <button>검색</button>
      </div>
      <div className="alarmLoginWrapper">
        <div className="alarmConatainer">알람</div>
        <div className="loginConatainer">
          <a href="http://54.180.25.241/api/auth/github">로그인</a>
          <div>프로필</div>
        </div>
      </div>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  & ul {
    display: flex;
    justify-content: center;
  }
  & li {
    margin: 20px 20px;
    cursor: pointer;
  }
`;
