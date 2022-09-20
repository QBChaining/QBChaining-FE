import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeQnaListDB,
  getBookmarkListDB,
  likeQnaListDB,
  postBookmarkListDB,
} from "../../redux/async/qna";
import { deleteBookmarkListDB } from "./../../redux/async/qna";
import { errorAlert, needLoginAlert } from "../../utils/swal";

import QnaLike from "../../assets/images/QnaLike.png";
import QnaLikeFill from "../../assets/images/QnaLikeFill.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import ToastViewer from "../editor/ToastViewer";
import { getToday } from "../../utils/today";

const QnaTarget = ({ isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const target = useSelector(state => state.qnaSlice.qnaTarget);
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin, userName } = useSelector(state => state.userSlice);
  //내 즐겨찾기 목록에 있는지 확인
  const isBookmarked =
    bookmarkList.filter(mark => mark.id === target.id).length > 0;

  const totalId = {
    id: target.id,
    title: target.title,
    user_name: target.userName,
    createdAt: getToday(),
  };

  //즐겨찾기 추가
  const onAddBookmark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBookmarkListDB(totalId));
  };

  //즐겨찾기 삭제
  const onDeleteBookmark = () => {
    dispatch(deleteBookmarkListDB(totalId));
  };

  //게시글 추천
  const onLikeQna = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(likeQnaListDB(totalId));
  };

  //게시글 추천 취소
  const onDislikeQna = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(dislikeQnaListDB(totalId));
  };

  //최초진입시 get요청
  useEffect(() => {
    if (isLogin) {
      dispatch(getBookmarkListDB());
    }
  }, []);

  return (
    <SQnaTarget>
      <SUserInfo>
        <SUserInfoWrapper
          onClick={() => {
            navigate(`/mypage/${target.userName}`);
          }}
        >
          <SUserProfile profile={target.profileImg} />
          <SUserInfoText>
            <SUserName>{target.userName}</SUserName>
            <SCreateAt>
              {target.createdAt?.slice(0, 10)} /{" "}
              {target.createdAt?.slice(11, 16)}
            </SCreateAt>
          </SUserInfoText>
        </SUserInfoWrapper>
        <SButtonWrapper>
          <SBookmarkButton
            isBookmarked={isBookmarked}
            onClick={isBookmarked ? onDeleteBookmark : onAddBookmark}
          ></SBookmarkButton>
          <SHoneyTipButton
            isLike={target.isLike}
            onClick={target.isLike ? onDislikeQna : onLikeQna}
          >
            {target.like}
          </SHoneyTipButton>
        </SButtonWrapper>
      </SUserInfo>
      <SContent>
        <SContentTitle>{target.title}</SContentTitle>
        <SContentText>
          <ToastViewer content={target.content} />
        </SContentText>
        <STags>
          {target.tag?.map((data, i) => {
            return <STag key={i}>{data}</STag>;
          })}
        </STags>
      </SContent>
    </SQnaTarget>
  );
};

export default QnaTarget;

const SQnaTarget = styled.div``;

const SButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonBackground = styled.button`
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
`;

const SBookmarkButton = styled(ButtonBackground)`
  background-position: center center;
  width: 24px;
  height: 24px;
  background-size: 100%;
  margin-right: 20px;
  background-image: url(${props =>
    props.isBookmarked ? BookmarkFillIcon : BookmarkNoFillIcon});
`;

const SHoneyTipButton = styled(ButtonBackground)`
  padding-right: 24px;
  background-position: right center;
  background-size: 16px 16px;
  background-image: url(${props => (props.isLike ? QnaLikeFill : QnaLike)});
  color: ${props => props.theme.color.grey7};
  font-size: 16px;
`;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 20px 30px 40px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
`;

const SUserProfile = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${props => props.profile});
  background-size: cover;
  border-radius: 50%;
`;

const SUserInfoText = styled.div`
  margin-left: 10px;
`;

const SUserName = styled.div`
  margin-bottom: 2px;
`;

const SCreateAt = styled.div`
  color: ${props => props.theme.color.grey6};
`;

const SContent = styled.div`
  padding: 0 20px 0 40px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
`;

const SContentTitle = styled.div`
  font-size: 22px;
  font-weight: 400;
  padding: 30px 0;
`;

const SContentText = styled.div`
  padding-bottom: 30px;
`;

const STags = styled.ul`
  display: flex;
  margin-bottom: 14px;
`;

const STag = styled.li`
  padding: 10px 18px;
  border: 1px solid ${props => props.theme.color.mainGreen};
  border-radius: 30px;
  margin-right: 16px;
  margin-bottom: 16px;
  color: ${props => props.theme.color.mainGreen};
  font-weight: 600;
`;
