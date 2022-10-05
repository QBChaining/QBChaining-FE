import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { throttle } from "lodash";

//컴포넌트
import Notification from "./Notification";
import SearchInput from "./../search/SearchInput";

//통신
import { getNotificationDB } from "../../redux/async/notification";
import { logIn, logOut } from "../../redux/modules/userSlice";
import { removeUserInfo } from "../../redux/modules/qnaSlice";
//알럿
import Swal from "sweetalert2";

//이미지
import MainLogo from "../../assets/images/MainLogo.png";

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
    Swal.fire("로그아웃 되었습니다", "", "success").then(() => {
      navigate("/", { replace: true });
    });
  };

  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);

  useEffect(() => {

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current < currentScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 10),
    [beforeScrollY],
  );

  //알람모달
  const [show, setShow] = useState(false);

  return (
    <SHeader location={location} visible={visible}>
      <SLogoContainer
        onClick={() => {
          navigate("/");
        }}
      >
        <SLogoImage />
      </SLogoContainer>

      <SearchInput />
      <SAlarmLoginWrapper>
        {isLogin && <Notification setShow={setShow} show={show} />}
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
  min-width: 1300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 100px;
  background: ${props => props.theme.color.mainNavy};
  color: white;
  position: sticky;
  top: ${props => (props.visible ? "0%" : "-20%")};
  left: 0;
  z-index: 900;
  transition: 0.3s;
`;

const SLogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SLogoImage = styled.div`
  width: 155px;
  height: 38px;
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
