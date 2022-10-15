import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { throttle } from "lodash";
import { RootState, AppDispatch } from "redux/config/configStore";

//컴포넌트
import Notification from "./Notification";
import SearchInput from "../search/SearchInput";

//통신
import { logOut } from "../../redux/modules/userSlice";
import { removeUserInfo } from "../../redux/modules/qnaSlice";
//알럿
import Swal from "sweetalert2";

//이미지
import MainLogo from "../../assets/images/MainLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const location = window.location.pathname;
  const { isLogin, userProfile, userName } = useSelector(
    (state: RootState) => state.userSlice,
  );
  const onLogoutHandler = () => {
    dispatch(logOut());
    dispatch(removeUserInfo());
    Swal.fire("로그아웃 되었습니다", "", "success").then(() => {
      navigate("/", { replace: true });
    });
  };
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
      }, 200),
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

const SHeader = styled.header<{ location: string; visible: boolean }>`
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

const SAlarmLoginWrapper = styled.div`
  display: flex;
  align-items: center;
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

const SUserProfile = styled.div<{ userProfile: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url(${props => props.userProfile});
  background-size: cover;
  cursor: pointer;
`;
