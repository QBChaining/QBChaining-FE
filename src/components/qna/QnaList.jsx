import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FiThumbsUp } from "react-icons/fi";
import { BiComment } from "react-icons/bi";

const QnaList = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //몇일전 구하는 함수
  const timeForToday = value => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  const time = timeForToday(data.createdAt);

  return (
    <StextMain>
      <div
        className="wrapper"
        onClick={() => {
          navigate(`/qna/detail/${data.id}`);
        }}
      >
        <div className="userInfo">
          <div className="profileContainer">
            <div className="profile"></div>
            <div className="userName">{data.user?.user_name}</div>
            <div className="createdAt">{time}</div>
          </div>
          <div className="categoryContainer">
            <div className="category">{data.category}</div>
          </div>
        </div>
        <div className="titleWrapper">
          <div className="title">{data.title}</div>
        </div>
        <div className="tagWrapper">
          <div className="tags">
            {data.tag?.map(data => {
              return (
                <div key={data} className="tag">
                  {data}
                </div>
              );
            })}
          </div>
          <div className="count">
            <div className="honeytip">
              {data.honey_tip}
              <div className="icon">
                <FiThumbsUp />
              </div>
            </div>
            <div className="cntcomment">
              {data.cntcomment}
              <div className="icon">
                <BiComment />
              </div>
            </div>
          </div>
        </div>
      </div>
    </StextMain>
  );
};

export default QnaList;

const StextMain = styled.div`
  & .wrapper {
    width: 100%;
    padding: 23px 49px 29px 29px;
    border: 1px solid #c6c6c6;
    border-radius: 30px;
    margin: 16px 0;
    cursor: pointer;
    & .userInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;

      & .profileContainer {
        display: flex;
        align-items: center;
      }

      & .profile {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        background-color: #c6c6c6;
        margin-right: 11px;
      }

      & .userName {
        margin-right: 9px;
        font-size: 20px;
      }

      & .createdAt {
        color: #c6c6c6;
        font-size: 15px;
      }
    }

    & .titleWrapper {
      margin: 25px 0;

      & .title {
        font-size: 20px;
      }
    }

    & .tagWrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      & .tags {
        display: flex;
        flex-wrap: wrap;
        & .tag {
          padding: 3px 17px;
          border-radius: 30px;
          background-color: #354160;
          margin-right: 12px;
          margin-bottom: 12px;
          color: white;
        }
      }

      & .count {
        display: flex;
        align-self: flex-end;
        & .icon {
          margin-top: 2px;
          margin-left: 6px;
        }

        & .honeytip {
          margin-right: 20px;
          display: flex;
          align-items: center;
        }

        & .cntcomment {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;
