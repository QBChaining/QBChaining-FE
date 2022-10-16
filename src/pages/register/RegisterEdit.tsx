import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "redux/config/configStore";
import { getUserInfoDB } from "../../redux/async/user";
import Register from "./Register";

const RegisterEdit = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userName, userInfo } = useSelector(
    (state: RootState) => state.userSlice,
  );

  useEffect(() => {
    dispatch(getUserInfoDB(userName));
  }, [userName, dispatch]);

  return (
    <>
      <Register isEdit={true} editData={userInfo} />
    </>
  );
};

export default RegisterEdit;
