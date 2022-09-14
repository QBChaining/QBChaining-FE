import React, { useState } from "react";
import styled from "styled-components";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import blogbookmark from "../../assets/images/blogbookmark.png";
import blogbookmarkadd from "../../assets/images/bookmarkadd.png";
const BlogBookMark = () => {
  //북마크 새로고침 상태유지를 위한 useSeloctor
  const is_bookmark = useSelector(state => state.blogSlice.blogList);
  const blogDetailBookMark = useSelector(state => state.blogSlice.blogList);
  console.log(blogDetailBookMark);
  // console.log(blogDetailBookMark.is_bookmark);
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
      {is_bookmark === true ? (
        <>
          <SBookMarkBtn onClick={onAddBookMark} />
        </>
      ) : (
        <>
          <SbookMarkBtnAdd onClick={onDeleteBookMark} />
        </>
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
