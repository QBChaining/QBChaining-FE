import React, { useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import instance from "./../../axios/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = () => {
  //주소창에 있는것 가져오기
  const navigate = useNavigate();
  if (window.location.search) {
    const token = window.location.search.split("=");
    setCookie("token", token[1]);
    let decoded = jwt_decode(getCookie("token"));
    console.log(decoded);
    // if (decoded.name === "Changsoon-Yun") {
    //   navigate("/register");
    // }
  }

  const onLogoutHandler = () => {
    deleteCookie("token");
    Swal.fire("로그아웃", "성공", "success").then(() => {
      navigate("/");
    });
  };

  return (
    <div>
      로딩중
      <button onClick={onLogoutHandler}>logout</button>
    </div>
  );
};

export default Login;
