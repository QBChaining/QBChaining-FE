import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//알럿
import { postBlogCommentDB } from "../../../redux/async/blog.js";

//이미지
import porfilecomment from "../../../assets/images/porfilecomment.png";

const CommentAdd = () => {
  const { userProfile, isLogin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const commentRefInput = useRef();
  const { id } = useParams();

  const addComment = e => {
    e.preventDefault();
    dispatch(
      postBlogCommentDB({
        comment: commentRefInput.current.value,
        id: parseInt(id),
      }),
    );
    commentRefInput.current.value = "";
  };

  return (
    <SComment>
      <SProfile url={isLogin ? userProfile : porfilecomment} />
      <input
        type="text"
        ref={commentRefInput}
        placeholder={"500자이하"}
        maxLength="500"
      />
      <button onClick={addComment}>추가하기</button>
    </SComment>
  );
};
const SComment = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  padding-top: 40px;
  input {
    flex: 1;
    margin-left: 27px;
    border: 1px solid ${props => props.theme.color.grey5};
    border-radius: 30px;
    height: 44px;
    padding: 0 160px 0 20px;
  }

  button {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 9px 40px;
    background: ${props => props.theme.color.mainNavy};
    border: none;
    color: ${props => props.theme.color.white};
    border-radius: 30px;
    font-weight: 700;
    font-size: 18px;
    height: 44px;
  }
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
`;

export default CommentAdd;
