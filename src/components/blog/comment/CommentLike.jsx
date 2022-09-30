import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
//이미지
import addlike from "../../../assets/images/addLike.png";
import unlike from "../../../assets/images/unlike.png";
// 경고창
import { needLoginAlert } from "../../../utils/swal";
import { postCommentLikeDB, delCommentLikeDB } from "../../../redux/async/blog";

const CommentLike = ({ comments, isLike }) => {
  const [isOn, setIsOn] = useState(null);
  const { isLogin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();

  const likeOn = id => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postCommentLikeDB(id));
    setIsOn(!isOn);
    console.log(isLike);
  };

  const likeOff = id => {
    dispatch(delCommentLikeDB(id));
    setIsOn(!isOn);
  };
  console.log(isOn);
  useEffect(() => {
    setIsOn(isLike);
  }, []);
  return (
    <SBlogLike>
      {isOn === true ? (
        <AddLike
          onClick={e => {
            likeOff(comments.id);
          }}
        />
      ) : (
        <UnLike
          onClick={e => {
            likeOn(comments.id);
          }}
        />
      )}
    </SBlogLike>
  );
};

export default CommentLike;
const UnLike = styled.div`
  width: 18px;
  height: 18px;
  background-position: center;
  background-size: contain;
  background-image: url(${unlike});
  background-repeat: no-repeat;
`;

const AddLike = styled.div`
  width: 18px;
  height: 18px;

  background-position: center;
  background-size: contain;
  background-image: url(${addlike});
  background-repeat: no-repeat;
`;
const SBlogLike = styled.div`
  display: flex;
  align-items: center;
  color: #c0c0c0;
  line-height: 20px;
  cursor: pointer;
`;
