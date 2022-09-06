import React, { useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const Login = () => {
  const { isLogin } = useSelector(state => state.userSlice);
  //주소창에 있는것 가져오기
  const navigate = useNavigate();
  if (window.location.search) {
    const token = window.location.search.split("=");
    setCookie("token", token[1]);
    let decoded = jwt_decode(getCookie("token"));
    if (decoded.is_new === "true") {
      setTimeout(() => {
        navigate("/register");
      }, 100);
    } else if (decoded.is_new === "false") {
      setTimeout(() => {
        navigate("/");
      }, 100);
    }
  }

  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그아웃 후 이용해주세요" }).then(res => {
      navigate(-1, { replace: true });
    });
  };

  useEffect(() => {
    if (isLogin) {
      alerts();
      return;
    }
  }, []);

  return <div></div>;
};

export default Login;
