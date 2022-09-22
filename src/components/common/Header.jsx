import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { HiOutlineBell } from "react-icons/hi";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../redux/modules/userSlice";
import { removeUserInfo } from "../../redux/modules/qnaSlice";
import SearchInput from "./../search/SearchInput";
import MainLogo from "../../assets/images/MainLogo.png";
import Notification from "./Notification";
// import Notification from "./Notification";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.pathname;
  const { isLogin, userProfile, userName } = useSelector(
    state => state.userSlice,
  );
  const onLogoutHandler = () => {
    dispatch(logOut());
    dispatch(removeUserInfo());
    Swal.fire("로그아웃", "성공", "success").then(() => {
      navigate("/", { replace: true });
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
              navigate(`/mypage/${userName}`);
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
          {/* <HiOutlineBell /> */}
          {/* <Notification /> */}
        </SAlarmConatainer>
        <SLoginConatainer className="loginConatainer">
          {isLogin ? (
            <button onClick={onLogoutHandler}>로그아웃</button>
          ) : (
            <a href={process.env.REACT_APP_ENDPOINT + "/auth/github"}>로그인</a>
          )}
          <SUserProfile
            className="loginProfile"
            userProfile={userProfile}
          ></SUserProfile>
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
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-image: url(${MainLogo});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
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
  }
`;

const SUserProfile = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url(${props => props.userProfile});
  background-size: cover;
`;
