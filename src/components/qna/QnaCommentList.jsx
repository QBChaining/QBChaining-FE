import { legacy_createStore } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Editor from "../common/Editor";
import { successAlert, errorAlert } from "./../../utils/swal";
import styled from "styled-components";
import QnaLike from "../../assets/images/QnaLike.png";
import QnaLikeFill from "../../assets/images/QnaLikeFill.png";
import WinnerCrown from "../../assets/images/WinnerCrown.png";
import ToastViewer from "./../editor/ToastViewer";
import {
  choiceCommentListDB,
  deleteCommentListDB,
  getCommentListDB,
  getOneQnaListDB,
  likeCommentListDB,
  dislikeCommentListDB,
} from "./../../redux/async/qna";

const QnaCommentList = ({ author, resolve, id, qnaId }) => {
  const dispatch = useDispatch();

  const [winner, setWinner] = useState([]);
  //commentList 구독
  const list = useSelector(state => state.qnaSlice.commentList);
  const { isLogin } = useSelector(state => state.userSlice);
  //로그인 유저 이름 구독
  const userName = useSelector(state => state.userSlice.userName);
  //최초진입시 commentList 받아오기
  useEffect(() => {
    dispatch(getCommentListDB(id));
  }, [id]);

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

  const onChoiceHandler = id => {
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

  useEffect(() => {
    setWinner(list.find(data => data.is_choose));
    // setWinner()
  }, [list]);

  return (
    <SQnaCommentList>
      <SCommentWrapper>
        {winner && (
          <SItemWrapper id={winner.id}>
            <SUserInfo>
              <SWinnerUserInfo>
                <SUserProfile profile={winner.profile_img} />
                <SUserInfoText>
                  <SUserNameWrapper>
                    <SUserName winner={true}>{winner.user_name}</SUserName>
                    {resolve && <SWinnerButton>채택</SWinnerButton>}
                  </SUserNameWrapper>
                  <SCreateAt winner={true}>{winner.createdAt}</SCreateAt>
                </SUserInfoText>
              </SWinnerUserInfo>
              <SButtonWrapper>
                <SHoneyTipButton
                  isHoneyTip={winner.is_honey_tip}
                  onClick={
                    winner.is_honey_tip
                      ? () => {
                          onDisLikeHandler(winner.id);
                        }
                      : () => {
                          onLikeHandler(winner.id);
                        }
                  }
                >
                  {winner?.honey_tip}
                </SHoneyTipButton>
              </SButtonWrapper>
            </SUserInfo>
            <SContentText>
              <ToastViewer content={winner?.comment} />
            </SContentText>
          </SItemWrapper>
        )}
        {list.map(data => (
          <SItemWrapper key={data.id}>
            <SUserInfo>
              <SUserInfoWrapper>
                <SUserProfile profile={data.profile_img} />

                <SUserInfoText>
                  <SUserNameWrapper>
                    <SUserName>{data.user_name}</SUserName>
                    {!resolve && (
                      <SChoiceButton
                        onClick={() => {
                          onChoiceHandler(data.id);
                        }}
                      >
                        채택
                      </SChoiceButton>
                    )}
                  </SUserNameWrapper>
                  <SCreateAt>{data.createdAt}</SCreateAt>
                </SUserInfoText>
              </SUserInfoWrapper>
              <SButtonWrapper>
                <SHoneyTipButton
                  isHoneyTip={data.is_honey_tip}
                  onClick={
                    data.is_honey_tip
                      ? () => {
                          onDisLikeHandler(data.id);
                        }
                      : () => {
                          onLikeHandler(data.id);
                        }
                  }
                >
                  {data.honey_tip}
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
};

export default QnaCommentList;

const SQnaCommentList = styled.div``;
const SCommentWrapper = styled.div``;
const SItemWrapper = styled.div``;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 20px 30px 40px;
`;

const SWinnerUserInfo = styled(SUserInfoWrapper)`
  background-color: ${props => props.theme.color.mainGreen};
  border-radius: 30px;
  padding: 1px 30px 1px 2px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -20px;
    left: 11px;
    background-image: url(${WinnerCrown});
    width: 28px;
    height: 28px;
    z-index: -1;
  }
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
`;

const SCreateAt = styled.div`
  color: ${props =>
    props.winner ? props.theme.color.white : props.theme.color.grey6};
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
  background-image: url(${props => (props.isHoneyTip ? QnaLikeFill : QnaLike)});
  color: ${props => props.theme.color.grey7};
  font-size: 16px;
`;

const SButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const SContentText = styled.div`
  padding: 0 20px 40px 40px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
`;

const SChoiceButton = styled.button`
  margin-left: 10px;
  padding: 2px 16px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => props.theme.color.mainGreen};
  background-color: ${props => props.theme.color.white};
  border: 1px solid ${props => props.theme.color.mainGreen};
  border-radius: 30px;

  &:hover {
    color: ${props => props.theme.color.white};
    background-color: ${props => props.theme.color.mainGreen};
  }
`;

const SWinnerButton = styled(SChoiceButton)`
  color: ${props => props.theme.color.mainGreen};
  background-color: ${props => props.theme.color.white};
  border: none;

  &:hover {
    color: ${props => props.theme.color.mainGreen};
    background-color: ${props => props.theme.color.white};
  }
`;
