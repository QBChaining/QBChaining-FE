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
      <div
        className="logoContainer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="logoImage"></div>
        <h1>CHAINING</h1>
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
      <SearchInput />
      <div className="alarmLoginWrapper">
        <div className="alarmConatainer active">
          <HiOutlineBell />
        </div>
        <div className="loginConatainer">
          {isLogin ? (
            <button onClick={onLogoutHandler}>로그아웃</button>
          ) : (
            // <a href={process.env.REACT_APP_GITHUB_API}>로그인</a>
            <a href="http://taesik.shop/api/auth/github">로그인</a>
          )}
          <div className="loginProfile"></div>
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

  & .logoContainer {
    display: flex;
    align-items: center;
    cursor: pointer;
    & .logoImage {
      width: 50px;
      height: 50px;
      background-color: white;
      border-radius: 50%;
      margin-right: 20px;
    }
    & h1 {
      font-size: 16px;
      font-weight: 500;
    }
  }
  & ul {
    display: flex;
    justify-content: center;
    flex-wrap: no-wrap;
    align-items: center;
  }
  & li {
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
  }

  & .searchContainer {
    & .searchIcon {
      position: absolute;
      top: 12px;
      left: 18px;
      z-index: 1;
      color: black;
      width: 18px;
      height: 18px;

      & svg {
        width: 100%;
        height: 100%;
      }
    }
  }

  & .alarmLoginWrapper {
    display: flex;
    align-items: center;

    & .alarmConatainer {
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
    }

    & .loginConatainer {
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
    }
  }
`;
