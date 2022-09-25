import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import LeftArrow from "../../assets/images/LeftArrow.png";
import { Helmet } from "react-helmet-async";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <SLanding>
      <Helmet>
        <title>QB-Chaning</title>
      </Helmet>
      <div className="logo"></div>
      <div
        className="goQna container"
        onClick={() => {
          navigate("/qna");
        }}
      >
        <span className="arrow"></span>Q&A
      </div>
      <div
        className="goBlog container"
        onClick={() => {
          navigate("/blog");
        }}
      >
        블로그<span className="arrow right"></span>
      </div>
    </SLanding>
  );
};

export default Landing;

const SLanding = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 100px);
  background: ${props => props.theme.color.mainIvory};
  display: flex;
  gap: 200px;

  & .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${logo});
    width: 707px;
    height: 537px;

    &::before {
      content: "오직 개발자를 위한 공간";
      position: absolute;
      width: 100%;
      bottom: -50px;
      left: 0;
      font-size: 20;
      font-weight: 400;
      text-align: center;
      color: #1e1e1e;
    }
  }

  & .container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.color.mainNavy};
    font-weight: 600;
    font-size: 24px;
    cursor: pointer;
    z-index: 1;
    & .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: ${props => props.theme.color.mainNavy};
      font-weight: 900;
      font-size: 20px;
      margin: 0 20px;
      background-image: url(${LeftArrow});
      background-repeat: no-repeat;
      background-position: center;

      &.right {
        transform: rotate(180deg);
      }
    }
  }
`;
