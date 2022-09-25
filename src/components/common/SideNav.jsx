import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();
  const goPage = page => {
    navigate(`/${page}`);
  };
  return (
    <SNav>
      <SUl>
        <SList
          onClick={() => {
            goPage("qna");
          }}
        >
          Q&A
        </SList>
        <SList
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
  background-color: ${props => props.theme.color.mainNavy};
  width: 93px;
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
`;
