import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notifion from "../../assets/images/notifion.png";
import notifitry from "../../assets/images/notifitry.png";
import notifioff from "../../assets/images/notifioff.png";
import {
  getNotificationDB,
  postNotificationDB,
  delNotificationDB,
} from "../../redux/async/notification";

const Notification = () => {
  const isNotifi = useSelector(state => state.notificationSlice.notification);

  const dispatch = useDispatch();
  console.log(isNotifi);

  const navigate = useNavigate();

  const checkNoti = notiId => {
    dispatch(postNotificationDB(notiId));
  };
  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };
  const delNoti = notiId => {
    dispatch(delNotificationDB(notiId));
  };
  useEffect(() => {
    dispatch(getNotificationDB());
  }, [dispatch]);
  return (
    <SNotiBox>
      <NotifiItem>
        {isNotifi.findIndex === true ? <SNotiOff /> : <SNotiOn />}
        <Section>
          <SNotiTry />
          <SItemList>
            {isNotifi?.map(list => (
              <li
                onClick={() => {
                  checkNoti(list?.notiId);
                  goDetail(list?.type, list?.id);
                }}
              >
                <STitle key={list?.id}>{list?.title}</STitle>
                <SDelButton
                  onClick={() => {
                    delNoti(list?.notiId);
                  }}
                >
                  삭제
                </SDelButton>
              </li>
            ))}
          </SItemList>
        </Section>
      </NotifiItem>
    </SNotiBox>
  );
};

const SNotiBox = styled.div`
  position: relative;
`;
const NotifiItem = styled.div`
  /* position: absolute; */
  width: 50px;
  height: 50px;
  /* top: 0px;
  left: 0px; */
  /* bottom: 20px; */
`;
const SNotiTry = styled.div`
  position: absolute;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${notifitry});
  width: 40px;
  height: 34px;
  top: -30px;
  left: 0;
  /* margin-left: 178px; */
`;
const SItemList = styled.div`
  position: absolute;
  width: 264px;
  height: 198px;
  overflow: auto;
  background: #f88f4c;
  border-radius: 20px;
  left: -169px;
  /* right: 0; */
  top: 0;

  padding: 20px 20px;
  & li {
    border-bottom: 1px solid #dcdcdc;
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #c0c0c0;
    margin-top: 3px;

    &:hover {
      color: black;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const SNotiOn = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${notifion});
  /* margin-top: 8px; */
`;
const SNotiOff = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${notifioff});
`;
const Section = styled.div`
  position: relative;

  background: #f88f4c;
  border-radius: 20px;
  margin-top: 50px;
  /* right: 180px;
  top: 35px; */
`;
const STitle = styled.div`
  cursor: pointer;
`;

const SDelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 30px;
  font-size: 8px;
  color: #ffffff;
  width: 33px;
  height: 17px;
  /* left: 1724px; */

  cursor: pointer;
`;

const SCheckButton = styled.div``;
export default Notification;
