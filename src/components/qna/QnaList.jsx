import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";
import ResolveWrapper from "../../assets/images/ResolveList.png";
import { useDispatch } from "react-redux";
import { FiThumbsUp } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import QnaCategoryImage from "./QnaCategoryImage";
import QnaBookmarkButton from "./../bookmark/QnaBookmarkButton";
import ResolvedListIcon from "../../assets/images/ResolvedListIcon.png";
import QnaLikeIcon from "../../assets/images/QnaLike.png";
import QnaCommentIcon from "../../assets/images/QnaComment.png";

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
    <StextMain ResolveWrapper={ResolveWrapper}>
      <SWrapper resolve={data.is_resolve}>
        <SUserInfo>
          <SProfileContainer>
            <SProfile></SProfile>
            <SUserName>{data.user?.user_name}</SUserName>
            <SCreatedAt>{time}</SCreatedAt>
          </SProfileContainer>
          <SCategoryContainer>
            <QnaCategoryImage item={data.category} />
            <QnaBookmarkButton id={data.id} is_bookmark={data.is_bookmark} />
          </SCategoryContainer>
        </SUserInfo>
        <STitleWrapper>
          <STitle
            onClick={() => {
              navigate(`/qna/detail/${data.id}`);
            }}
          >
            {data.title}
          </STitle>
        </STitleWrapper>
        <STagWrapper>
          <STags className="tags">
            {data.tag?.map((data, i) => {
              return <Tag key={i}>{data}</Tag>;
            })}
          </STags>
          <SCount>
            <SHoneytip>
              {data.honey_tip}
              <SIcon icon={QnaLikeIcon} />
            </SHoneytip>
            <SCntcomment>
              {data.cntcomment}
              <SIcon icon={QnaCommentIcon} />
            </SCntcomment>
          </SCount>
        </STagWrapper>
      </SWrapper>
    </StextMain>
  );
};

export default QnaList;

const StextMain = styled.div``;

const SWrapper = styled.div`
  width: 100%;
  padding: 23px 49px 32px 29px;
  /* padding-left: ${props => (props.resolve ? "137px" : "23px")}; */
  border: ${props => (props.resolve ? "" : "1px solid #c6c6c6")};
  box-shadow: ${props =>
    props.resolve ? "4px 6px 15px rgba(0, 0, 0, 0.1);" : null};
  border-radius: 30px;
  margin: 16px 0;
  /* background-image: url(${props =>
    props.resolve ? props.ResolveWrapper : null}); */
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SProfile = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: black;
  margin-right: 11px;
`;
const SUserName = styled.div`
  margin-right: 9px;
  font-size: 20px;
`;
const SCreatedAt = styled.div`
  color: ${props => props.theme.color.grey4};
  font-size: 15px;
`;

const SCategoryContainer = styled.div`
  display: flex;

  & > div:first-child {
    margin-right: 20px;
  }
`;

const STitleWrapper = styled.div`
  margin: 25px 0;
  cursor: pointer;
`;
const STitle = styled.div`
  font-size: 22px;
`;

const STagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const STags = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Tag = styled.div`
  padding: 3px 17px;
  border-radius: 30px;
  background-color: ${props => props.theme.color.mainGreen};
  margin-right: 12px;
  margin-bottom: 12px;
  color: white;
  cursor: pointer;
`;

const SCount = styled.div`
  display: flex;
  align-self: flex-start;
  color: #999;
`;
const SHoneytip = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;
const SIcon = styled.div`
  margin-top: 2px;
  margin-left: 6px;
  width: 17px;
  height: 17px;
  background-image: url(${props => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
const SCntcomment = styled.div`
  display: flex;
  align-items: center;
`;
