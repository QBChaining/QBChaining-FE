import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FiThumbsUp } from "react-icons/fi";
import { BiComment } from "react-icons/bi";
import QnaCategoryImage from "../qna/QnaCategoryImage";
import QnaBookmarkButton from "../bookmark/QnaBookmarkButton";
import ResolveWrapper from "../../assets/images/ResolveList.png";
import ResolvedListIcon from "../../assets/images/ResolvedListIcon.png";
import NoResolvedListIcon from "../../assets/images/NoResolvedListIcon.png";
import QnaLikeIcon from "../../assets/images/QnaLike.png";
import QnaCommentIcon from "../../assets/images/QnaComment.png";
import GreyQnaLikeIcon from "../../assets/images/GreyQnaLike.png";
import GreyQnaCommentIcon from "../../assets/images/GreyQnaComment.png";
import ProfileDefault from "../../assets/images/ProfileDefault.png";
import unlike from "../../assets/images/unlike.png";
import BlogComment from "../../assets/images/BlogComment.png";
import { setSearchWord } from "../../redux/modules/searchSlice";
import { getOneQnaListDB } from "../../redux/async/qna";
const ContentList = ({ data, type, isSearch }) => {
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

  const goMypage = name => {
    navigate(`/mypage/${name}`);
  };

  const goSearch = (content, e) => {
    e.stopPropagation();
    dispatch(setSearchWord(content));
    navigate(`/search?q=${content}`);
  };

  return (
    <StextMain ResolveWrapper={ResolveWrapper}>
      {isSearch && type === "qna" && (
        <SSolveText resolve={data.isResolve}>
          {data.isResolve ? "채택 완료" : "채택미완료"}
        </SSolveText>
      )}
      <SWrapper
        onClick={() => {
          navigate(`/${type}/detail/${data.id}`);
        }}
        type={type}
        resolve={data.isResolve}
        ResolveWrapper={ResolveWrapper}
        isSearch={isSearch}
      >
        <SUserInfo>
          <SProfileContainer>
            <SProfile profile={data.profileImg}></SProfile>
            <SUserName>{data.userName}</SUserName>
            <SCreatedAt>{time}</SCreatedAt>
          </SProfileContainer>
          <SCategoryContainer>
            <QnaCategoryImage item={data.category} />
            <QnaBookmarkButton
              type={type}
              id={data.id}
              resolve={data.isResolve}
              is_bookmark={data.isBookmark}
            />
          </SCategoryContainer>
        </SUserInfo>
        <STitleWrapper>
          <STitle>{data.title}</STitle>
        </STitleWrapper>
        <STagWrapper>
          <STags>
            {data.tags?.map((data, i) => {
              return (
                <Tag type={type} key={i}>
                  {data}
                </Tag>
              );
            })}
          </STags>
          <SCount>
            <SHoneytip>
              {data.like}
              <SLikeIcon type={type} resolve={data.isResolve} />
            </SHoneytip>
            <SCntcomment>
              {data.cntcomment}
              <SCommentIcon type={type} resolve={data.isResolve} />
            </SCntcomment>
          </SCount>
        </STagWrapper>
      </SWrapper>
    </StextMain>
  );
};

export default ContentList;

const StextMain = styled.div`
  position: relative;
`;

const SSolveText = styled.div`
  position: absolute;
  right: 30px;
  top: -35px;
  padding-left: 26px;
  background-position: left 0 top 6px;
  background-size: 16px;
  background-repeat: no-repeat;
  font-size: 18px;
  font-weight: 700;
  color: ${props =>
    props.resolve ? props.theme.color.black : props.theme.color.grey5};
  background-image: url(${props =>
    props.resolve ? ResolvedListIcon : NoResolvedListIcon});
`;

const SWrapper = styled.div`
  width: 100%;
  padding: 30px 50px 18px 50px;
  min-height: 200px;
  transition: 0.5s;
  background-color: ${props => props.theme.color.white};
  border: ${props =>
    props.type === "qna"
      ? props.resolve
        ? `1px solid ${props.theme.color.mainOrange}`
        : `1px solid ${props.theme.color.grey3}`
      : `1px solid ${props.theme.color.mainOrange}`};
  border-radius: 30px;

  margin: 30px 0
    ${props => (props.isSearch && props.type === "qna" ? "65px" : "30px")} 0;
  &:first-child {
    margin-top: 20px;
  }
  cursor: pointer;
  &:hover {
    box-shadow: #fce3cd -10px 10px 0px 0px;
  }
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 2px solid ${props => props.theme.color.mainNavy};
`;

const SProfileContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SProfile = styled.div`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.grey3};
  background-image: url(${props => props.profile});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  margin: 10px 0 25px 0;
  cursor: pointer;
`;

const STitle = styled.div`
  font-size: 22px;
  max-width: 588px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  display: flex;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px 20px;
  border-radius: 30px;
  color: ${props => props.theme.color.mainNavy};
  border: 2px solid ${props => props.theme.color.mainNavy};
  margin-right: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  justify-content: center;
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const SLikeIcon = styled(SIcon)`
  background-image: url(${props =>
    props.type === "qna"
      ? props.resolve
        ? unlike
        : GreyQnaLikeIcon
      : unlike});
`;

const SCommentIcon = styled(SIcon)`
  background-image: url(${props =>
    props.type === "qna"
      ? props.resolve
        ? BlogComment
        : GreyQnaCommentIcon
      : BlogComment});
`;

const SCntcomment = styled.div`
  display: flex;
  align-items: center;
`;
