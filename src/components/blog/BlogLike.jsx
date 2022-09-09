import React from "react";
import { useDispatch } from "react-redux";
import { postBlogLikeDB, unBlogLikeDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
const BlogLike = () => {
  // 내일 할 일
  // response props로 받아서 버튼 삼항연산자로 표현하기
  const dispatch = useDispatch();
  const { id } = useParams();

  const onClickHandler = () => {
    dispatch(postBlogLikeDB(id));
  };

  const onUnHandler = () => {
    dispatch(unBlogLikeDB(id));
  };

  return (
    <div>
      <button type="button" onClick={onClickHandler}>
        ❤️
      </button>
      <button type="button" onClick={onUnHandler}>
        🤍
      </button>
    </div>
  );
};

export default BlogLike;
