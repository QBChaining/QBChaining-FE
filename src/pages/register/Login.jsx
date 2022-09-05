import React from "react";
import { setCookie } from "../../utils/cookie";
import instance from "./../../axios/axios";

const Login = () => {
  //주소창에 있는것 가져오기
  if (window.location.search) {
    const token = window.location.search.split("=");
    setCookie(token[1], token[2]);
  }

  const onLogoutHandler = () => {
    instance
      .get("/auth/logout")
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  };

  return (
    <div>
      <button onClick={onLogoutHandler}>logout</button>
    </div>
  );
};

export default Login;
