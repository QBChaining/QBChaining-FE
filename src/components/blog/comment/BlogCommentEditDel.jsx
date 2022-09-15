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
    <div>
      {!show ? (
        <SCommentList>
          <SProfile url={userProfile} />
          <div>{comments.User?.user_name}</div>
          <SDate>
            {" "}
            {comments.createdAt?.slice(0, 10)} /{" "}
            {comments.createdAt?.slice(11, 16)}
          </SDate>
          <small>{comments.comment}</small>

          {userNick === comments.User?.user_name ? (
            <ButtonGroup>
              <div
                className="editbtn"
                type="button"
                onClick={() => {
                  setShow(!show);
                }}
              >
                수정
              </div>
              <div>|</div>
              <div
                className="delbtn"
                type="button"
                onClick={onClickDeleteHandler}
              >
                삭제
              </div>
            </ButtonGroup>
          ) : null}
        </SCommentList>
      ) : (
        <SCommentList>
          <SProfile url={userProfile} />
          <div>{comments.User?.user_name}</div>
          <SDate>
            {" "}
            {comments.createdAt?.slice(0, 10)} /{" "}
            {comments.createdAt?.slice(11, 16)}
          </SDate>
          {/* <small>{comments.comment}</small> */}
          <input type="text" placeholder={comments.comment} ref={editRef} />
          <ButtonGroup>
            <div
              className="editcomplet"
              onClick={() => {
                onClickEditHandler(comments.id);
                setShow(!show);
              }}
            >
              수정완료
            </div>
          </ButtonGroup>
        </SCommentList>
      )}
    </div>
  );
};

const SCommentList = styled.div``;
const SDate = styled.div`
  font-size: 14px;
  color: #939393;
`;

const SProfile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.grey3};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 11px;
`;
const ButtonGroup = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin: 20px 40px 0px 0px;
  font-size: 16px;
  color: #7a7a7a;
  & .editbtn {
    cursor: pointer;
  }
  & .delbtn {
    cursor: pointer;
  }
  & .editcomplet {
    cursor: pointer;
  }
`;
export default CommentEditDel;
