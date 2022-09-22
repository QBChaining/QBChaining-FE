import React, { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationDB,
  postNotificationDB,
} from "../../redux/async/notification";
import styled from "styled-components";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
import Polygon from "../../assets/images/Polygon 4.png";
const Notification = () => {
  const notificationUser = useSelector(state => state.userSlice.userName);

  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

  const onCheck = () => {
    dispatch(postNotificationDB([{ id: notificationUser }]));
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
        <>
          <Semo />
          <SBox>
            <SNotifyList>
              {/* {notificationResponse?.map(noti => (
                <div key={noti.id}>
                  <SItem>
                    <div>{noti.post_title}</div>
                    <button onClick={onCheck}>확인</button>
                  </SItem>
                </div>
              ))} */}
            </SNotifyList>
          </SBox>
        </>
      ) : null}
    </div>
  );
};
const SBox = styled.div`
  position: absolute;

  top: 4em;
  /* right: 0em; */
  left: -10em;
  /* margin-left: 50px; */
  position: absolute;
  width: 264px;
  height: 198px;

  background: #ffffff;
  border-radius: 20px;

  .buttun {
    /* position: relative; */

    width: 100px;
    height: 100px;
    margin-top: 50px;
  }
`;
const Semo = styled.div`
  position: absolute;
  bottom: -2em;
  right: 0.2em;
  width: 45px;
  height: 44px;
  background-image: url(${Polygon});
  background-size: cover;
`;
const SNotifyList = styled.div``;

const SItem = styled.div``;
export default Notification;
