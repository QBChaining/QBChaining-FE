import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postBlogLikeDB, unBlogLikeDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
const BlogLike = ({ data }) => {
  // 내일 할 일
  // response props로 받아서 버튼 삼항연산자로 표현하기
  // 즐겨찾기, 마이블로그 다 끝내기!
  const dispatch = useDispatch();
  const { id } = useParams();
  const [Like, setLike] = useState(false);

  const onClickHandler = () => {
    dispatch(postBlogLikeDB(id));
  };

  const onUnHandler = () => {
    dispatch(unBlogLikeDB(id));
  };

  return (
    <div>
      {Like === true ? (
        <button
          type="button"
          onClick={() => {
            onClickHandler();
            setLike(!Like);
          }}
        >
          🤍
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            onUnHandler();
            setLike(!Like);
          }}
        >
          ❤️
        </button>
      )}
    </div>
  );
};

export default BlogLike;
