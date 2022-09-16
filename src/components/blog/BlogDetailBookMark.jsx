import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  postBlogBookMarkDB,
  deleteBlogBookMarkDB,
  getBlogBookMarkDB,
} from "../../redux/async/blog.js";
import { useDispatch, useSelector } from "react-redux";
import { errorAlert, needLoginAlert } from "../../utils/swal";
import blogbookmark from "../../assets/images/blogbookmark.png";
import blogbookmarkadd from "../../assets/images/bookmarkadd.png";
import { useParams } from "react-router-dom";
const BlogBookMark = ({ isbookmark }) => {
  console.log(isbookmark);
  const [bookMark, setBookMark] = useState(isbookmark);
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.userSlice);
  const { id } = useParams();
  const onAddBookMark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogBookMarkDB(id));
    setBookMark(!bookMark);
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(id));
    setBookMark(!bookMark);
  };
  useEffect(() => {
    dispatch(getBlogBookMarkDB());
  }, []);

  return (
    <div>
      {bookMark === true ? (
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
