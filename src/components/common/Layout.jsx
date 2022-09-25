import React from "react";
import Header from "./Header";
import SideNav from "./SideNav";

const Layout = props => {
  return (
    <div>
      <Header />
      <SideNav />
      {props.children}
    </div>
  );
};

export default Layout;
