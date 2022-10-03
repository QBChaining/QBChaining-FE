import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getToday } from "../../utils/today";

//컴포넌트
import ToastViewer from "../editor/ToastViewer";

//통신
import {
  dislikeQnaListDB,
  likeQnaListDB,
  postBookmarkListDB,
} from "../../redux/async/qna";
import { deleteBookmarkListDB } from "./../../redux/async/qna";
//알럿
import { needLoginAlert } from "../../utils/swal";
//이미지
import QnaLike from "../../assets/images/unlike.png";
import QnaLikeFill from "../../assets/images/addLike.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";

const QnaTarget = ({ isDatail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const target = useSelector(state => state.qnaSlice.qnaTarget);
  const bookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
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

  return (
    <SQnaTarget>
      <SUserInfo>
        <SUserInfoWrapper>
          <SBookmarkButton
            isBookmarked={target.isBookmark}
            onClick={target.isBookmark ? onDeleteBookmark : onAddBookmark}
          ></SBookmarkButton>
          <SContentTitle>{target.title}</SContentTitle>
          <SUserInfoInner
            onClick={() => {
              navigate(`/mypage/${target.userName}`);
            }}
          >
            <SUserInfoText>
              <SUserName>{target.userName}</SUserName>
              <SCreateAt>
                {target.createdAt?.slice(0, 10)} /{" "}
                {target.createdAt?.slice(11, 16)}
              </SCreateAt>
            </SUserInfoText>
            <SUserProfile profile={target.profileImg} />
          </SUserInfoInner>
        </SUserInfoWrapper>
      </SUserInfo>
      <SContent>
        <SContentText>
          <ToastViewer content={target.content} />
        </SContentText>
        <STags>
          {target.tags?.map((data, i) => {
            return <STag key={i}>{data}</STag>;
          })}
          <SHoneyTipButton
            isLike={target.isLike}
            onClick={target.isLike ? onDislikeQna : onLikeQna}
          >
            {target.like}
          </SHoneyTipButton>
        </STags>
      </SContent>
    </SQnaTarget>
  );
};

export default QnaTarget;

const SQnaTarget = styled.div``;

const ButtonBackground = styled.button`
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
`;

const SBookmarkButton = styled(ButtonBackground)`
  position: absolute;
  background-position: center center;
  width: 24px;
  height: 24px;
  background-size: 100%;
  background-image: url(${props =>
    props.isBookmarked ? BookmarkFillIcon : BookmarkNoFillIcon});
`;

const SHoneyTipButton = styled(ButtonBackground)`
  position: absolute;
  right: 0;
  top: 0;
  padding-right: 24px;
  background-position: right center;
  background-size: 16px 16px;
  background-image: url(${props => (props.isLike ? QnaLikeFill : QnaLike)});
  color: ${props => props.theme.color.grey7};
  font-size: 16px;
`;

const SUserInfoWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 0 0 0;
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
  margin-right: 10px;
  text-align: right;
`;

const SUserName = styled.div`
  margin-bottom: 2px;
  font-size: 14px;
`;

const SCreateAt = styled.div`
  font-size: 12px;
  color: ${props => props.theme.color.grey6};
`;

const SContent = styled.div`
  padding: 0 20px 0 40px;
`;

const SContentTitle = styled.div`
  font-size: 18px;
  font-weight: 400;
  padding: 30px 0;
  margin-left: 40px;
  margin-right: 20px;
  min-width: 200px;
  word-break: break-all;
`;

const SContentText = styled.div`
  min-height: 100px;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const STags = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
  padding-right: 40px;
`;

const STag = styled.li`
  padding: 10px 18px;
  border: 1px solid ${props => props.theme.color.mainOrange};
  border-radius: 30px;
  margin-right: 16px;
  margin-bottom: 16px;
  color: ${props => props.theme.color.mainOrange};
  font-weight: 600;
`;

const SUserInfoInner = styled.div`
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
`;
