import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
  getBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { errorAlert, needLoginAlert } from "../../utils/swal";

import blogbookmark from "../../assets/images/blogbookmark.png";
import blogbookmarkadd from "../../assets/images/bookmarkadd.png";
// const { isLogin, userName } = useSelector(state => state.userSlice);
// console.log(userName);
const BlogBookMark = ({ isbookmark }) => {
  //북마크 새로고침 상태유지를 위한 useSeloctor

  const dispatch = useDispatch();
  const { id } = useParams();

  const onAddBookMark = () => {
    // if (!isLogin) {
    //   needLoginAlert();
    //   return;
    // }
    dispatch(postBlogBookMarkDB(id));
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(id));
  };
  useEffect(() => {
    dispatch(getBlogBookMarkDB());
  }, []);
  return (
    <div>
      {/* <SbookMarkBtnAdd
        isbookmark={isbookmark}
        onClick={isbookmark === true ? onDeleteBookMark : onAddBookMark}
      />
      <SbookMarkBtnAdd onClick={onDeleteBookMark} /> */}
      {isbookmark == true ? (
        <SBookMarkBtn onClick={onDeleteBookMark} />
      ) : (
        <SbookMarkBtnAdd onClick={onAddBookMark} />
      )}
    </div>
  );
};
const SBookMarkBtn = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmarkadd});
  cursor: pointer;
`;

const SbookMarkBtnAdd = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmark});
  cursor: pointer;
`;
export default BlogBookMark;
