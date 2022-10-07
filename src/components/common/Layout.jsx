import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";
import styled from "styled-components";

const Layout = props => {
  return (
    <SLayout>
      <Header />
      <SideNav />
      {props.children}
    </SLayout>
  );
};

export default Layout;

const SLayout = styled.div``;
