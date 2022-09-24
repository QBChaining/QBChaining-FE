import React from "react";
import styled from "styled-components";
import bigLogo from "../../assets/images/BigLogo.png";
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
      <div className="bigLogo"></div>
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
  background: linear-gradient(270.85deg, #2676ed -0.91%, #2ad798 97.98%);
  display: flex;

  & .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${logo});
    width: 322px;
    height: 393px;
  }

  & .container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
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
      background-color: rgba(255, 255, 255, 0.7);
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
