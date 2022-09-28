import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import notifitry from "../../assets/images/notifitry.png";
import notifion from "../../assets/images/notifion.png";
import notifioff from "../../assets/images/notifioff.png";
import {
  getNotificationDB,
  postNotificationDB,
  delNotificationDB,
} from "../../redux/async/notification";

const Notification = () => {
  const notifiResponse = useSelector(
    state => state.notificationSlice.notification,
  );

  const isNoti = notifiResponse?.filter(data => data.check === false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 알림 on,off 상태값
  const [isNo, setIsNo] = useState(null);
  // 알림 모달창
  const [show, setShow] = useState(false);
  // 더미

  // 디테일페이지로가기
  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };
  // 알림 보기
  const onShow = () => {
    setShow(!show);
  };
  // 확인, 삭제
  const checkNoti = notiId => {
    dispatch(postNotificationDB(notiId));
  };
  const delNoti = notiId => {
    dispatch(delNotificationDB(notiId));
  };

  const checkk = isNoti => {
    if (isNoti?.length === 0 || isNoti === undefined) {
      setIsNo(true);
    } else {
      setIsNo(false);
    }
  };
  useEffect(() => {
    dispatch(getNotificationDB());
    checkk(isNoti);
  }, [isNoti?.length]);

  return (
    <SNotiBox>
      <NotifiItem>
        <SNotiImage>
          {isNo ? <SNotiOff onClick={onShow} /> : <SNotiOn onClick={onShow} />}
        </SNotiImage>
        {show === true ? (
          <Section>
            <SNotiTry />
            <SItemList>
              {notifiResponse?.map(list => (
                <li
                  key={list?.notiId}
                  onClick={() => {
                    checkNoti(list?.notiId);
                    goDetail(list?.type, list?.id);
                  }}
                >
                  <STitle key={list?.notiId}>{list?.title}</STitle>
                  <SDelButton
                    onClick={e => {
                      e.stopPropagation();
                      delNoti(list?.notiId);
                    }}
                  >
                    삭제
                  </SDelButton>
                </li>
              ))}
            </SItemList>
          </Section>
        ) : null}
      </NotifiItem>
    </SNotiBox>
  );
};

const SNotiBox = styled.div`
  position: relative;
`;
const NotifiItem = styled.div`
  width: 50px;
  height: 50px;
`;
const SNotiImage = styled.div`
  margin-top: 15px;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #c0c0c0;
    margin-top: 3px;
    cursor: pointer;

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
  cursor: pointer;
  /* margin-top: 8px; */
`;
const SNotiOff = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${notifioff});
  cursor: pointer;
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
