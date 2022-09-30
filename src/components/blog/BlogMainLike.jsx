import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

//통신
import { postBlogLikeDB, unBlogLikeDB } from "../../redux/async/blog";
//알럿
import { needLoginAlert } from "../../utils/swal";

//이미지
import addlike from "../../assets/images/addLike.png";
import unlike from "../../assets/images/unlike.png";

const BlogLike = ({ isLove }) => {
  const { isLogin } = useSelector(state => state.userSlice);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Like, setLike] = useState(isLove);
  useEffect(() => {
    if (isLove) {
      setLike(true);
    }
    if (!isLove) {
      setLike(false);
    }
  }, [isLove]);
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
  return <div>{Like === false ? <UnLike /> : <AddLike />}</div>;
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
