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
const BlogBookMark = ({ isbookmark, posts, isdetailbookmark }) => {
  const [bookMark, setBookMark] = useState(isbookmark);

  return (
    <>
      <div>{bookMark === true ? <SBookMarkBtn /> : <SbookMarkBtnAdd />}</div>
    </>
  );
};
const SBookMarkBtn = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmarkadd});
`;

const SbookMarkBtnAdd = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmark});
`;

export default BlogBookMark;
