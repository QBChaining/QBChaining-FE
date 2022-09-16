import React, { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationDB,
  postNotificationDB,
} from "../../redux/async/notification";
import styled from "styled-components";
const Notification = () => {
  const notification = useSelector(state => state);
  console.log(notification);

  const notificationUser = useSelector(state => state.userSlice.userName);
  console.log(notificationUser);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const onCheck = () => {
    dispatch(postNotificationDB({ id: notification }));
  };
  useEffect(() => {
    dispatch(getNotificationDB());
  }, []);
  return (
    <div>
      <HiOutlineBell
        onClick={() => {
          setModal(!modal);
        }}
      />
      {modal === true ? (
        <SBox>
          <button onClick={onCheck}>버튼</button>
        </SBox>
      ) : null}
    </div>
  );
};
const SBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;

  .buttun {
    width: 100px;
    height: 100px;
    margin-top: 50px;
  }
`;
export default Notification;
