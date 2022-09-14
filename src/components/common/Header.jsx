import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineBell } from "react-icons/hi";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../redux/modules/userSlice";
import { removeUserInfo } from "../../redux/modules/qnaSlice";
import SearchInput from "./../search/SearchInput";

const Header = () => {
  console.log();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.pathname;
  const { isLogin } = useSelector(state => state.userSlice);
  const onLogoutHandler = () => {
    Swal.fire("로그아웃", "성공", "success")
      .then(() => {
        dispatch(logOut());
        dispatch(removeUserInfo());
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <SHeader location={location}>
      <SLogoContainer
        onClick={() => {
          navigate("/");
        }}
      >
        <SLogoImage />
        <STitle>CHAINING</STitle>
      </SLogoContainer>
      <SNav>
        <SNavInner>
          <SNavItem
            onClick={() => {
              navigate("/mypage");
            }}
          >
            마이페이지
          </SNavItem>
          <SNavItem
            onClick={() => {
              navigate("/ranking");
            }}
          >
            랭킹
          </SNavItem>
          <SNavItem
            onClick={() => {
              navigate("/qna");
            }}
          >
            QNA
          </SNavItem>
          <SNavItem
            onClick={() => {
              navigate("/blog");
            }}
          >
            블로그
          </SNavItem>
        </SNavInner>
      </SNav>
      <SearchInput />
      <SAlarmLoginWrapper>
        <SAlarmConatainer className="alarmConatainer active">
          <HiOutlineBell />
        </SAlarmConatainer>
        <SLoginConatainer className="loginConatainer">
          {isLogin ? (
            <button onClick={onLogoutHandler}>로그아웃</button>
          ) : (
            // <a href={process.env.REACT_APP_GITHUB_API}>로그인</a>
            <a href={process.env.REACT_APP_ENDPOINT + "/auth/github"}>로그인</a>
          )}
          <div className="loginProfile"></div>
        </SLoginConatainer>
      </SAlarmLoginWrapper>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  display: block;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 100px;
  background: ${props =>
    props.location.includes("/qna")
      ? props.theme.color.mainGreen
      : props.location.includes("/blog")
      ? props.theme.color.mainBlue
      : props.theme.color.backgroundGradient};
  color: white;
  position: relative;
  z-index: 1;
`;

const SLogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SLogoImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: white;
  border-radius: 50%;
  margin-right: 20px;
`;

const STitle = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const SNav = styled.nav``;

const SNavInner = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: no-wrap;
  align-items: center;
`;

const SNavItem = styled.li`
  cursor: pointer;
  padding: 20px 40px;
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  &::before {
    content: "";
    width: 1px;
    height: 24px;
    position: absolute;
    top: 20px;
    right: 0;
    display: block;
    background-color: white;
  }

  &:last-child::before {
    display: none;
  }
`;

const SAlarmLoginWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SAlarmConatainer = styled.div`
  margin-right: 64px;
  cursor: pointer;
  position: relative;
  padding: 10px;
  & svg {
    width: 24px;
    height: 26px;
  }

  &.active::before {
    content: "";
    display: block;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: #ff2626;
  }
`;
const SLoginConatainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;

  & button {
    margin-right: 10px;
    color: white;
    text-decoration: none;
    font-size: 16px;
    background-color: transparent;
    border: none;
  }

  & a {
    margin-right: 10px;
    color: white;
    text-decoration: none;
    font-size: 16px;
  }

  & .loginProfile {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
  }
`;
