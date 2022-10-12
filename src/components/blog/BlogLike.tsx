import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState, AppDispatch } from "redux/config/configStore";

//통신
import { postBlogLikeDB, unBlogLikeDB } from "../../redux/async/blog";
//알럿
import { needLoginAlert } from "../../utils/swal";
//이미지
import addlike from "../../assets/images/addLike.png";
import unlike from "../../assets/images/unlike.png";

const BlogLike = ({ isLike, like }: { isLike: boolean; like: number }) => {
  const { isLogin } = useSelector((state: RootState) => state.userSlice);
  const dispatch: AppDispatch = useDispatch();
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
