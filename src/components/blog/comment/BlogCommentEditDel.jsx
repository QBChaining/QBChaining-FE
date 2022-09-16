import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  patchBlogCommentDB,
  deleteBlogCommentDB,
  getBlogCommentListDB,
} from "../../../redux/async/blog";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../../redux/modules/userSlice";
import { useParams } from "react-router-dom";
const CommentEditDel = ({ comments, userdata }) => {
  const { id } = useParams();
  const userProfile = useSelector(state => state.userSlice.userProfile);
  const userNick = useSelector(state => state.userSlice.userName);
  const [show, setShow] = useState(false);
  const editRef = useRef();

  const dispatch = useDispatch();

  //댓글 수정 완료 버튼
  const onClickEditHandler = () => {
    dispatch(
      patchBlogCommentDB({
        comment: editRef.current.value,
        id: comments.id,
      }),
    );
    setShow(!show);
  };

  //댓글 삭제 버튼
  const onClickDeleteHandler = e => {
    e.preventDefault();
    dispatch(deleteBlogCommentDB(comments.id));
  };
  useEffect(() => {
    dispatch(getBlogCommentListDB(id));
  }, [dispatch]);

  return (
    <>
      <SCommentList>
        <SProfileWrapper>
          <SProfile url={userProfile} />
          <div>{comments.User?.user_name}</div>
          <SDate>
            {comments.createdAt?.slice(0, 10)} /
            {comments.createdAt?.slice(11, 16)}
          </SDate>
        </SProfileWrapper>
        {!show ? (
          <SComment>{comments.comment}</SComment>
        ) : (
          <STextArea type="text" placeholder={comments.comment} ref={editRef} />
        )}
        {userNick === comments.User?.user_name && (
          <ButtonGroup>
            <div
              className="editbtn"
              type="button"
              onClick={
                show
                  ? () => {
                      onClickEditHandler();
                    }
                  : () => {
                      setShow(!show);
                    }
              }
            >
              {show ? "수정완료" : "수정하기"}
            </div>
            <div
              className="delbtn"
              type="button"
              onClick={onClickDeleteHandler}
            >
              삭제
            </div>
          </ButtonGroup>
        )}
      </SCommentList>
    </>
  );
};

export default CommentEditDel;

const SCommentList = styled.div`
  background: ${props => props.theme.color.grey2};
  border-radius: 20px;
  padding: 20px 40px;
  position: relative;
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;
const SDate = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #939393;
`;

const SProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.color.grey5};
`;

const SProfile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 11px;
`;
const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: #7a7a7a;

  & > div {
    padding: 0 10px;
    cursor: pointer;
  }

  & > div:first-child {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 6px;
      right: 0;
      width: 1px;
      height: 12px;
      background-color: #7a7a7a;
    }
  }
`;

const SComment = styled.div`
  padding: 10px 0 10px 55px;
  font-size: 18px;
`;

const STextArea = styled.textarea`
  display: block;
  float: right;
  width: calc(100% - 55px);
  padding: 10px;
  font-size: 18px;
  resize: none;
`;
