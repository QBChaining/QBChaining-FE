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

const QnaTarget = ({ data, isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
  //내 즐겨찾기 목록에 있는지 확인
  const isBookmarked =
    bookmarkList.filter(mark => mark.qna_id === data.id).length > 0;

  const totalId = {
    qna_id: data.id,
    Qna: { title: data.title },
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

  console.log(data.honey_tip);

  return (
    <SQnaTarget>
      <SUserInfo>
        <SUserInfoWrapper>
          <SUserProfile profile={data.user?.profile_img} />
          <SUserInfoText>
            <SUserName>{data.user?.email}</SUserName>
            <SCreateAt>{data.user?.createdAt}</SCreateAt>
          </SUserInfoText>
        </SUserInfoWrapper>
        <SButtonWrapper>
          <SBookmarkButton
            isBookmarked={isBookmarked}
            onClick={isBookmarked ? onDeleteBookmark : onAddBookmark}
          ></SBookmarkButton>
          <SHoneyTipButton
            isHoneyTip={data.is_honey_tip}
            onClick={data.is_honey_tip ? onDislikeQna : onLikeQna}
          >
            {data.honey_tip}
          </SHoneyTipButton>
        </SButtonWrapper>
      </SUserInfo>
      <SContentTitle>{data.title}</SContentTitle>
      <ToastViewer content={data.content} />
      <div>
        <div>카테고리 : {data.category}</div>
        <div>추천수 : {data.honeytip}</div>
        <div>
          {data.tag?.map((data, i) => {
            return <div key={i}>{data}</div>;
          })}
        </div>
      </div>
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
  background-image: url(${props => (props.isHoneyTip ? QnaLikeFill : QnaLike)});
  color: ${props => props.theme.color.grey7};
  font-size: 16px;
`;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 30px;
  padding-top: 60px;
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

const SContentTitle = styled.div`
  font-size: 22px;
  font-weight: 400;
`;
