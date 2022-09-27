import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import notifion from "../../assets/images/notifion.png";
import { getNotificationDB } from "../../redux/async/notification";
import notificationSlice from "../../redux/modules/notificationSlice";
const Notification = () => {
  const isNotifi = useSelector(state => state.notificationSlice);
  console.log(isNotifi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationDB());
  }, []);
  console.log(isNotifi);
  return (
    <NotifiItem>
      <SNoti />
      <Section></Section>
    </NotifiItem>
  );
};

const NotifiItem = styled.div`
  width: 50px;
  height: 50px;
`;
const SNoti = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${notifion});
`;
const Section = styled.div``;

export default Notification;
