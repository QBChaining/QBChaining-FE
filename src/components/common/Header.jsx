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
import { errorAlert } from "../../utils/swal";
// import Notification from "./Notification";
import NotifiTest from "./NotifiTest";

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
      태식샵으로 연결했습니다
      <SLogoContainer
        onClick={() => {
          navigate("/");
        }}
      >
        <SLogoImage />
        <STitle>CHAINING</STitle>
      </SLogoContainer>

      <SearchInput />
      <SAlarmLoginWrapper>
        <SAlarmConatainer className="alarmConatainer active">
          {/* <HiOutlineBell /> */}
          <NotifiTest />
          {/* <Notification /> */}
        </SAlarmConatainer>
        <SLoginConatainer className="loginConatainer">
          {isLogin ? (
            <button onClick={onLogoutHandler}>로그아웃</button>
          ) : (
            <a href={process.env.REACT_APP_ENDPOINT + "/auth/github"}>로그인</a>
          )}
          <SUserProfile
            onClick={() => {
              navigate(`/mypage/${userName}`);
            }}
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 100px;
  background: ${props => props.theme.color.mainNavy};
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
  cursor: pointer;
`;
