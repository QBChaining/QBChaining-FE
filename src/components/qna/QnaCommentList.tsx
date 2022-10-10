import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ToastViewer from "../editor/ToastViewer";
import { useNavigate } from "react-router-dom";

//통신
import {
  choiceCommentListDB,
  deleteCommentListDB,
  likeCommentListDB,
  dislikeCommentListDB,
} from "../../redux/async/qna";

//알럿
import Swal from "sweetalert2";
import { errorAlert } from "../../utils/swal";
//이미지
import QnaLike from "../../assets/images/unlike.png";
import QnaLikeFill from "../../assets/images/addLike.png";
import WinnerCrown from "../../assets/images/WinnerCrown.png";

const QnaCommentList = ({ id, qnaId, isPreview }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //commentList 구독
  const { commentList: list } = useSelector(state => state.qnaSlice);

  //디테일정보 구독
  const target = useSelector(state => state.qnaSlice.qnaTarget);

  const { isLogin, userName } = useSelector(state => state.userSlice);

  //코멘트 삭제 dispatch
  const onDeleteHandler = id => {
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }
    dispatch(deleteCommentListDB(id));
  };

  //댓글 추천
  const onLikeHandler = id => {
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }
    dispatch(likeCommentListDB(id));
  };

  //댓글 추천 취소
  const onDisLikeHandler = id => {
    dispatch(dislikeCommentListDB(id));
  };

  const onChoiceHandler = (e, id) => {
    e.stopPropagation();
    Swal.fire({
      title: "채택 하시겠습니까?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "확인",
      denyButtonText: `취소`,
    }).then(res => {
      if (res.isConfirmed) {
        dispatch(choiceCommentListDB({ id, qnaId, userName }));
      } else if (res.isDenied || res.isDismissed) {
        errorAlert("취소 하셨습니다.");
      }
    });
  };

  const goMypage = username => {
    navigate(`/mypage/${username}`);
  };

  if (list.length === 0) {
    return <SNoComment>채택받을만한 댓글을 써보세요!</SNoComment>;
  } else {
    return (
      <SQnaCommentList>
        <SCommentWrapper>
          {list.map(data => (
            <SItemWrapper key={data.id}>
              <SUserInfo>
                <SUserInfoWrapper
                  isChoose={data.isChoose}
                  onClick={() => {
                    goMypage(data.userName);
                  }}
                >
                  <SUserProfile profile={data.profileImg} />
                  <SUserInfoText>
                    <SUserNameWrapper>
                      <SUserName>{data.userName}</SUserName>
                      {data.isChoose && <SWinnerButton>채택됨</SWinnerButton>}
                      {!target.isResolve &&
                        !isPreview &&
                        target.userName === userName &&
                        target.userName !== data.userName && (
                          <SChoiceButton
                            onClick={e => {
                              onChoiceHandler(e, data.id);
                            }}
                          >
                            채택
                          </SChoiceButton>
                        )}
                    </SUserNameWrapper>
                    <SCreateAt isChoose={data.isChoose}>
                      {data.createdAt?.slice(0, 10)} /{" "}
                      {data.createdAt?.slice(11, 16)}
                    </SCreateAt>
                  </SUserInfoText>
                </SUserInfoWrapper>
                <SButtonWrapper>
                  <SHoneyTipButton
                    isLike={data.isLike}
                    onClick={
                      data.isLike
                        ? () => {
                            onDisLikeHandler(data.id);
                          }
                        : () => {
                            onLikeHandler(data.id);
                          }
                    }
                  >
                    {data.like}
                  </SHoneyTipButton>
                </SButtonWrapper>
              </SUserInfo>
              <SContentText>
                <ToastViewer content={data.comment} />
              </SContentText>
            </SItemWrapper>
          ))}
        </SCommentWrapper>
      </SQnaCommentList>
    );
  }
};

export default QnaCommentList;

const SQnaCommentList = styled.div``;
const SCommentWrapper = styled.div``;
const SItemWrapper = styled.div`
  background-color: white;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 1px solid #eee;
`;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1px 30px 1px 2px;
  position: relative;
  border-radius: 30px;

  &::before {
    display: ${props => (props.isChoose ? "block" : "none")};
    content: "";
    position: absolute;
    top: -20px;
    left: 11px;
    background-image: url(${props => (props.isChoose ? WinnerCrown : "")});
    width: 28px;
    height: 28px;
    z-index: -1;
  }

  background-color: ${props =>
    props.isChoose ? props.theme.color.mainOrange : "transparent"};
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0 30px 0;
  margin: 0 20px 0 40px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
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

const SUserNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SUserName = styled.div`
  margin-bottom: 2px;
  font-weight: ${props => (props.winner ? "600" : "400")};
  color: ${props =>
    props.winner ? props.theme.color.white : props.theme.color.black};
  cursor: pointer;
`;

const SCreateAt = styled.div`
  font-size: 12px;
  color: ${props =>
    props.isChoose ? props.theme.color.white : props.theme.color.grey6};
`;

const ButtonBackground = styled.button`
  background-repeat: no-repeat;
  border: none;
  background-color: transparent;
`;

const SHoneyTipButton = styled(ButtonBackground)`
  padding-right: 24px;
  background-position: right center;
  background-size: 16px 16px;
  background-image: url(${props => (props.isLike ? QnaLikeFill : QnaLike)});
  color: ${props => props.theme.color.grey7};
  font-size: 16px;
`;

const SButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SContentText = styled.div`
  padding: 0 20px 40px 40px;
`;

const SChoiceButton = styled.button`
  margin-left: 10px;
  padding: 2px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.color.mainOrange};
  background-color: transparent;
  border: 1px solid ${props => props.theme.color.mainOrange};
  border-radius: 30px;
  transition: 0.3s;

  &:hover {
    color: ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.mainOrange};
  }
`;

const SWinnerButton = styled(SChoiceButton)`
  color: ${props => props.theme.color.mainOrange};
  background-color: ${props => props.theme.color.white};
  border: none;
  line-height: 15px;
  &:hover {
    color: ${props => props.theme.color.mainOrange};
    background-color: ${props => props.theme.color.white};
  }
`;

const SNoComment = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  font-weight: 500;
  min-height: 100px;
  background-color: white;
`;
