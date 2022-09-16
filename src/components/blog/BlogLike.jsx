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
const BlogLike = ({ love }) => {
  const { isLogin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Like, setLike] = useState(love);
  console.log(love);
  const onLikeBlog = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogLikeDB(id));
    setLike(!Like);
  };
  const onUnLikeBlog = () => {
    dispatch(unBlogLikeDB(id));
    setLike(!Like);
  };
  return (
    <div>
      {Like === false ? (
        <UnLike onClick={onLikeBlog} />
      ) : (
        <AddLike onClick={onUnLikeBlog} />
      )}
    </div>
  );
};
const AddLike = styled.div`
  width: 18px;
  height: 18px;

  background-position: center;
  background-size: contain;
  background-image: url(${addlike});
  background-repeat: no-repeat;
  cursor: pointer;
`;
const UnLike = styled.div`
  width: 18px;
  height: 18px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${unlike});
  cursor: pointer;
`;
export default BlogLike;
