import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserInfoDB } from "./../../redux/async/user";
import Register from "./Register";

const RegisterEdit = () => {
  const dispatch = useDispatch();
  const { userName, userInfo } = useSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(getUserInfoDB(userName));
  }, [userName]);

  return (
    <>
      <Register isEdit={true} editData={userInfo} />
    </>
  );
};

export default RegisterEdit;
