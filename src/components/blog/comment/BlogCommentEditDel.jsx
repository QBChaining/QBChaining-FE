import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//통신
import {
  patchBlogCommentDB,
  deleteBlogCommentDB,
} from "../../../redux/async/blog";
//알럿
import { errorAlert } from "../../../utils/swal";

const CommentEditDel = ({ comments }) => {
  const navigate = useNavigate();
  const userNick = useSelector(state => state.userSlice.userName);
  const [show, setShow] = useState(false);
  const [textAreaText, setTextAreaText] = useState("");
  const editRef = useRef();

  const dispatch = useDispatch();

  //댓글 수정 완료 버튼f
  const onClickEditHandler = () => {
    if (editRef.current.value.length < 1) {
      errorAlert("빈칸입니다!");
      return;
    }
    dispatch(
      patchBlogCommentDB({
        comment: textAreaText,
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
  // useEffect(() => {
  //   dispatch(getBlogCommentListDB());
  // }, [dispatch]);

  const goMypage = userName => {
    navigate(`/mypage/${userName}`);
  };

  return (
    <>
      <SCommentList>
        <SProfileWrapper>
          <SProfile
            onClick={() => {
              goMypage(comments.userName);
            }}
            url={comments.profileImg}
          />
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              goMypage(comments.userName);
            }}
          >
            {comments.userName}
          </div>
          <SDate
            onClick={() => {
              goMypage(comments.userName);
            }}
          >
            {comments.createdAt?.slice(0, 10)} /
            {comments.createdAt?.slice(11, 16)}
          </SDate>
        </SProfileWrapper>
        {!show ? (
          <SComment>{comments.comment}</SComment>
        ) : (
          <STextArea
            type="text"
            value={textAreaText}
            onChange={e => {
              setTextAreaText(e.target.value);
            }}
            ref={editRef}
          />
        )}
        {userNick === comments.userName && (
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
                      setTextAreaText(comments.comment);
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
  background: ${props => props.theme.color.white};
  border-radius: 20px;
  padding: 20px 40px;
  position: relative;
  &::after {
    clear: both;
    content: "";
    display: block;
  }
`;
const SDate = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: #939393;
  cursor: pointer;
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
  cursor: pointer;
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
  width: 100%;
  word-break: break-all;
`;

const STextArea = styled.textarea`
  display: block;
  float: right;
  width: calc(100% - 55px);
  padding: 10px;
  font-size: 18px;
  resize: none;
`;
