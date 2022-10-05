import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import styled from "styled-components";

//통신
import {
  getNotificationDB,
  postNotificationDB,
  delNotificationDB,
} from "../../redux/async/notification";
//알럿
import { needLoginAlert } from "../../utils/swal";

//이미지
import notifitry from "../../assets/images/notifitry.png";
import allamOff from "../../assets/images/allimOff.png";
import allamOn from "../../assets/images/allimOn.png";
import allamDot from "../../assets/images/allamDot.png";
const Notification = ({ show, setShow }) => {
  const notifiResponse = useSelector(
    state => state.notificationSlice.notification,
  );
  const { isLogin } = useSelector(state => state.userSlice);
  const address = window.location.href;
  const isNoti = notifiResponse?.filter(data => data.check === false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 알림 on,off 상태값o
  const [isNo, setIsNo] = useState(false);
  // 알림 모달창
  const wrapperRef = useRef();
  // 디테일페이지로가기
  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };

  // 알림 보기
  const onShow = e => {
    e.stopPropagation();
    if (!isLogin) {
      needLoginAlert();
      return;
    }
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
    //isNoti는 아직 안읽은것
    if (isNoti?.length === 0 || isNoti === undefined) {
      setIsNo(true);
    } else {
      setIsNo(false);
    }
  };

  //최초 로딩시 받아오기
  useEffect(() => {
    if (isLogin) {
      dispatch(getNotificationDB());
    }
  }, [address, show]);

  useEffect(() => {
    setShow(false);
  }, [address]);

  useEffect(() => {
    checkk(isNoti);
  }, [isNoti]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = event => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <SNotiBox>
      <NotifiItem>
        <SNotiImage>
          {isNo ? (
            <SNotiOff onClick={onShow} />
          ) : (
            <SNotiOn onClick={onShow}>
              <SNDot>
                <SAlNum>{isNoti.length}</SAlNum>
              </SNDot>
            </SNotiOn>
          )}
        </SNotiImage>
        {show === true ? (
          <Section>
            <SNotiTry />
            <SItemList isOpen={show} ref={wrapperRef}>
              {notifiResponse.length === 0 && (
                <SNodata>알림이 오면 여기에 표시됩니다!</SNodata>
              )}
              {notifiResponse.map(list => (
                <SNotiList
                  isChecked={list.check}
                  key={list.notiId}
                  onClick={() => {
                    checkNoti(list.notiId);
                    goDetail(list.type, list.id);
                  }}
                >
                  <STitle key={list.notiId}>{list.title}</STitle>
                  <SDelButton
                    onClick={e => {
                      e.stopPropagation();
                      delNoti(list.notiId);
                    }}
                  >
                    삭제
                  </SDelButton>
                </SNotiList>
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
  top: 0;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  padding: 5px 20px;
`;

const SNotiOn = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${allamOff});
  cursor: pointer;
  /* margin-top: 8px; */
`;
const SNotiOff = styled.div`
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${allamOn});
  cursor: pointer;
`;

const SNDot = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${allamDot});
  top: -3px;
  left: 9.5px;
`;

const SAlNum = styled.div`
  position: relative;

  font-size: 2px;

  top: 12px;
  left: 17px;
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
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const SDelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 30px;
  font-size: 8px;
  color: #ffffff;
  padding: 4px 10px;
  /* left: 1724px; */

  &:hover {
    background-color: ${props => props.theme.color.white};
    color: ${props => props.theme.color.mainOrange};
  }

  cursor: pointer;
`;

const SCheckButton = styled.div``;

const SNotiList = styled.li`
  border-bottom: 1px solid #dcdcdc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${props => props.theme.color.white};
  padding: 10px;
  cursor: pointer;

  opacity: ${props => (props.isChecked ? "0.5" : "1")};

  &:hover {
    color: ${props => props.theme.color.mainNavy};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const SNodata = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Notification;
