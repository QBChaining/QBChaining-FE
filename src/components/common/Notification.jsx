import React, { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotificationDB,
  postNotificationDB,
} from "../../redux/async/notification";
import styled from "styled-components";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";
const Notification = () => {
  const notificationResponse = useSelector(
    state => state.notificationSlice.notification,
  );
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
        <SBox>
          <SNotifyList>
            {notificationResponse?.map(noti => (
              <div key={noti.id}>
                <SItem>
                  <div>{noti.post_title}</div>
                  <button onClick={onCheck}>확인</button>
                </SItem>
              </div>
            ))}
          </SNotifyList>
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

const SNotifyList = styled.div``;

const SItem = styled.div``;
export default Notification;
