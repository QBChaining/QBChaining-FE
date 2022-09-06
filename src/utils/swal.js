import Swal from "sweetalert2";

export const successAlert = message => {
  return Swal.fire({
    icon: "success",
    text: message,
    confirmButtonText: "확인",
  });
};

export const errorAlert = message => {
  return Swal.fire({
    icon: "error",
    text: message,
    confirmButtonText: "확인",
  });
};

export const needLoginAlert = () => {
  return Swal.fire({
    icon: "error",
    title: "로그인이 필요한 기능입니다",
    confirmButtonText: "확인",
  });
};

export const networkError = () => {
  return Swal.fire({
    icon: "error",
    title: "에러",
    text: "네트워크 연결 상태를 확인해주세요!",
    confirmButtonText: "확인",
  });
};

export const nonePageAlert = () => {
  return Swal.fire({
    icon: "info",
    title: "구현중인 기능입니다!",
    confirmButtonText: "확인",
  });
};

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const likeAlert = message => {
  return Toast.fire({ icon: "success", title: message });
};

export const errorLikeAlert = message => {
  return Toast.fire({ icon: "error", title: message });
};
