import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NoLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const needLogoutAlert = (text: string) => {
    Swal.fire({ icon: "error", text: text }).then(result => {
      if (result.isConfirmed || result.isDismissed)
        navigate("-1", { replace: true });
    });
  };

  const needLoginAlert = () => {
    Swal.fire({
      title: "로그인이 필요한 기능입니다",
      text: "로그인 버튼은 오른쪽 위에 있습니다!",
      icon: "warning",
      confirmButtonText: "확인",
    }).then(res => {
      if (res.isConfirmed || res.isDismissed) {
        navigate("-1", { replace: true });
      }
    });
  };

  useEffect(() => {
    if (location.pathname === "/login") {
      needLogoutAlert("로그아웃 후 이용해주세요");
    } else {
      needLoginAlert();
    }
  }, []);
  return <div></div>;
};

export default NoLogin;
