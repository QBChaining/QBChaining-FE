import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SideNav = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const { userName } = useParams();
  const goPage = page => {
    navigate(`/${page}`);
  };

  const { userName: loginUserName, isLogin } = useSelector(
    state => state.userSlice,
  );

  return (
    <SNav>
      <SUl>
        <SList
          location={location}
          type={"qna"}
          onClick={() => {
            goPage("qna");
          }}
        >
          Q&A
        </SList>
        <SList
          location={location}
          type={"blog"}
          onClick={() => {
            goPage("blog");
          }}
        >
          BLOG
        </SList>
        {isLogin && (
          <SMypage
            isMine={location.slice(8) === loginUserName}
            location={location}
            type={"mypage"}
            onClick={() => {
              goPage(`mypage/${loginUserName}`);
            }}
          >
            MyPage
          </SMypage>
        )}
      </SUl>
    </SNav>
  );
};

export default SideNav;

const SNav = styled.nav`
  position: fixed;
  top: 130px;
  left: 0;
  z-index: 200;
`;

const SUl = styled.ul``;

const SList = styled.li`
  background-color: ${props =>
    props.location.includes(props.type)
      ? props.theme.color.mainOrange
      : props.theme.color.mainNavy};
  /* background-color: ${props => props.theme.color.mainNavy}; */
  width: 93px;
  width: ${props => (props.location.includes(props.type) ? "120px" : "93px")};
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.white};
  margin-bottom: 10px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    width: 120px;
    background-color: ${props => props.theme.color.mainOrange};
  }
`;

const SMypage = styled(SList)`
  background-color: ${props =>
    props.isMine ? props.theme.color.mainOrange : props.theme.color.mainNavy};
  /* background-color: ${props => props.theme.color.mainNavy}; */
  width: 93px;
  width: ${props => (props.isMine ? "120px" : "93px")};
  height: 40px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.white};
  margin-bottom: 10px;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    width: 120px;
    background-color: ${props => props.theme.color.mainOrange};
  }
`;
