import React from "react";
import styled from "styled-components";
import bigLogo from "../../assets/images/BigLogo.png";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <SLanding>
      <div className="bigLogo"></div>
      <div className="logo"></div>
      <div
        className="goQna container"
        onClick={() => {
          navigate("/qna");
        }}
      >
        <span className="arrow"> &lt;</span>Q&A
      </div>
      <div
        className="goBlog container"
        onClick={() => {
          navigate("/blog");
        }}
      >
        블로그<span className="arrow"> &gt;</span>
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

  & .bigLogo {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${bigLogo});
    width: 823px;
    height: 745px;
  }
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
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.7);
      font-weight: 900;
      font-size: 20px;
      margin: 0 20px;
    }
  }
`;
