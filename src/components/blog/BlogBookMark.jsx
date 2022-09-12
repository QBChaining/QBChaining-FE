import React, { useState } from "react";
import styled from "styled-components";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import blogbookmark from "../../assets/images/blogbookmark.png";
import blogbookmarkadd from "../../assets/images/bookmarkadd.png";
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
        <div type="button" onClick={onAddBookMark}>
          <SBookMarkBtn />
        </div>
      ) : (
        <div type="button" onClick={onDeleteBookMark}>
          <SbookMarkBtnAdd />
        </div>
      )}
    </div>
  );
};
const SBookMarkBtn = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmark});
`;

const SbookMarkBtnAdd = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmarkadd});
`;
export default BlogBookMark;
