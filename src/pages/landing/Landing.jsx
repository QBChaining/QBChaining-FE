import React from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <SLanding>
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
  background: linear-gradient(270deg, #fa98b8 0.67%, #8dc6fd 97.6%);
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
