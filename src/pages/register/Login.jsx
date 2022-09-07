import React, { useEffect } from "react";
import { setCookie, deleteCookie, getCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/modules/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      //주소창에서 토큰값 자르기
      const token = window.location.search.split("=");
      //자른 값에 뒷부분을 token이란 이름으로 쿠키에 저장
      setCookie("token", token[1]);

      //쿠키를 디코드해서 값 추출
      let decoded = jwt_decode(getCookie("token"));

      //추출한 값중에 is_new값에 따라 분기처리
      if (decoded.is_new === "true") {
        navigate("/register", { replace: true });
        dispatch(logIn());
      } else if (decoded.is_new === "false") {
        navigate("/", { replace: true });
        dispatch(logIn());
      }
    }
  }, []);

  const alerts = () => {
    Swal.fire({ icon: "error", text: "로그아웃 후 이용해주세요" }).then(res => {
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    //login상태라면 로그아웃 하라는 alert
    if (isLogin) {
      alerts();
      return;
    }
  }, []);

  return <div></div>;
};

export default Login;
