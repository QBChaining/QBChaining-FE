import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineBell } from "react-icons/hi";
import { getCookie } from "../../utils/cookie";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../../redux/modules/userSlice";
import { removeUserInfo } from "../../redux/modules/qnaSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = window.location.pathname;
  const search = useRef();
  const { isLogin } = useSelector(state => state.userSlice);
  const onLogoutHandler = () => {
    Swal.fire("로그아웃", "성공", "success")
      .then(() => {
        navigate("/");
      })
      .then(() => {
        dispatch(logOut());
        dispatch(removeUserInfo());
      });
  };

  //임시검색창

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
      <div className="searchContainer">
        <div className="searchIcon">
          <AiOutlineSearch />
        </div>
        <input ref={search} type="text" placeholder="Javascript" />
        <button
          onClick={() => {
            axios.get(`http://kpzzy.shop/api/search?q=node  `).then(res => {
              console.log(res);
            });
          }}
        >
          검색
        </button>
      </div>
      <div className="alarmLoginWrapper">
        <div className="alarmConatainer active">
          <HiOutlineBell />
        </div>
        <div className="loginConatainer">
          {isLogin ? (
            <button onClick={onLogoutHandler}>로그아웃</button>
          ) : (
            // <a href={process.env.REACT_APP_GITHUB_API}>로그인</a>
            <a href="http://kpzzy.shop/api/auth/github">로그인</a>
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
    props.location === "/qna"
      ? props.theme.color.mainGreen
      : props.location === "/blog"
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
    max-width: 600px;
    min-width: 200px;
    width: 100%;
    height: 42px;
    position: relative;
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
    & input {
      width: 100%;
      height: 100%;
      padding: 0 120px 0 40px;
      border-radius: 30px;
      border: 1px solid #939393;

      &:active {
        outline: none;
      }
      &:focus {
        outline: none;
      }
    }
    & button {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 87px;
      border-radius: 30px;
      background-color: #1e1e1e;
      color: white;
      font-size: 15px;
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
