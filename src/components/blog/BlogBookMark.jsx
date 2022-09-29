import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
  getBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, needLoginAlert } from "../../utils/swal";
import blogbookmark from "../../assets/images/BookmarkNoFillIcon.png";
import blogbookmarkadd from "../../assets/images/BookmarkFillIcon.png";
import { useParams } from "react-router-dom";
import QnaTarget from "../qna/QnaTarget.jsx";
import { getToday } from "../../utils/today.js";
const BlogBookMark = ({ isbookmark, posts, isdetailbookmark }) => {
  const { isLogin } = useSelector(state => state.userSlice);
  console.log(posts);
  console.log("isbookmark", isbookmark);
  const dispatch = useDispatch();
  const totalData = {
    id: posts.id,
    title: posts.title,
    userName: posts.userName,
    createdAt: posts.createdAt,
  };

  const onAddBookMark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }

    dispatch(postBlogBookMarkDB(totalData));
  };
  const onDeleteBookMark = id => {
    dispatch(deleteBlogBookMarkDB(id));
  };
  return (
    <>
      <div>
        {isbookmark === false ? (
          <SBookMarkBtn
            onClick={() => {
              onAddBookMark(totalData);
            }}
          />
        ) : (
          <SbookMarkBtnAdd
            onClick={e => {
              onDeleteBookMark(posts.id);
            }}
          />
        )}
      </div>
    </>
  );
};
const SbookMarkBtnAdd = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmarkadd});
`;

const SBookMarkBtn = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmark});
`;

export default BlogBookMark;
