import React, { useEffect } from "react";
import { setCookie, getCookie } from "../../utils/cookie";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/modules/userSlice";
import { RootState } from "redux/config/configStore";

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: RootState) => state.userSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    }

    if (window.location.search.length === 0) {
      navigate("/");
    }

    if (window.location.search) {
      //주소창에서 토큰값 자르기
      const token = window.location.search.split("=");
      //자른 값에 뒷부분을 token이란 이름으로 쿠키에 저장
      setCookie("token", token[1], "");

      //쿠키를 디코드해서 값 추출
      let decoded: { isNew: string } = jwt_decode(getCookie("token"));
      //추출한 값중에 is_new값에 따라 분기처리
      if (decoded.isNew === "true") {
        dispatch(logIn());
        navigate(`/register`, { replace: true });
      } else if (decoded.isNew === "false") {
        dispatch(logIn());
        navigate("/", { replace: true });
      }
    }
  }, []);

  return <div></div>;
};

export default Login;
