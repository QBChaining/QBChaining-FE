import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const location = window.location.pathname;
  const goPage = page => {
    navigate(`/${page}`);
  };
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
      </SUl>
    </SNav>
  );
};

export default SideNav;

const SNav = styled.nav`
  position: absolute;
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
