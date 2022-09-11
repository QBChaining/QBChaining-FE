import React, { useState } from "react";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
const BlogBookMark = () => {
  const [mark, setMark] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const onAddBookMark = () => {
    dispatch(postBlogBookMarkDB(parseInt(id)));
    setMark(!mark);
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(parseInt(id)));
    setMark(!mark);
  };
  return (
    <div>
      {mark === false ? (
        <button type="button" onClick={onAddBookMark}>
          ☆
        </button>
      ) : (
        <button type="button" onClick={onDeleteBookMark}>
          ⭐️
        </button>
      )}
    </div>
  );
};

export default BlogBookMark;
