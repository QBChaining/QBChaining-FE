import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import notifion from "../../assets/images/notifion.png";
const Notification = () => {
  const isNotifi = useSelector(state => state);
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
