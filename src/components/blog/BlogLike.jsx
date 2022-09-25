import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postBlogLikeDB,
  unBlogLikeDB,
  // getBlogDetailDB,
} from "../../redux/async/blog";
import { useParams } from "react-router-dom";
import addlike from "../../assets/images/addLike.png";
import unlike from "../../assets/images/unlike.png";
import styled from "styled-components";
import { errorAlert, needLoginAlert } from "../../utils/swal";
const BlogLike = ({ isLike, like }) => {
  const { isLogin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const { id } = useParams();

  const onLikeBlog = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogLikeDB(id));
  };
  const onUnLikeBlog = () => {
    dispatch(unBlogLikeDB(id));
  };

  return (
    <SBlogLike onClick={isLike === true ? onUnLikeBlog : onLikeBlog}>
      {like}
      {isLike === false ? <UnLike /> : <AddLike />}
    </SBlogLike>
  );
};

const AddLike = styled.div`
  width: 18px;
  height: 18px;

  background-position: center;
  background-image: url(${addlike});
  background-repeat: no-repeat;
  margin-left: 6px;
`;
const UnLike = styled.div`
  width: 18px;
  height: 18px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${unlike});
  margin-left: 6px;
`;

const SBlogLike = styled.div`
  display: flex;
  align-items: center;
  color: #c0c0c0;
  line-height: 20px;
  cursor: pointer;
`;

export default BlogLike;
