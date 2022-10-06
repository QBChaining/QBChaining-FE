import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

//통신
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
} from "../../redux/async/blog.js";

//알럿
import { needLoginAlert } from "../../utils/swal";

//이미지
import blogbookmark from "../../assets/images/BookmarkNoFillIcon.png";
import blogbookmarkadd from "../../assets/images/BookmarkFillIcon.png";

const BlogBookMark = ({ isbookmark, posts }) => {
  const { isLogin } = useSelector(state => state.userSlice);

  const dispatch = useDispatch();
  const totalData = {
    id: posts.id,
    title: posts.title,
    userName: posts.userName,
    createdAt: posts.createdAt,
  };

  return (
    <>
      <div>{isbookmark === false ? <SBookMarkBtn /> : <SbookMarkBtnAdd />}</div>
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
