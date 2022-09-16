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
const BlogBookMark = ({ isbookmark, posts, isdetailbookmark }) => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.userSlice);
  const [bookMark, setBookMark] = useState(isbookmark);
  const onAddBookMark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogBookMarkDB(posts.id));
    setBookMark(!bookMark);
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(posts.id));
    setBookMark(!bookMark);
  };
  useEffect(() => {
    dispatch(getBlogBookMarkDB());
  }, []);
  return (
    <>
      {isdetailbookmark ? (
        <div>
          {bookMark === true ? (
            <SBookMarkBtn onClick={onDeleteBookMark} />
          ) : (
            <SbookMarkBtnAdd onClick={onAddBookMark} />
          )}
        </div>
      ) : (
        <div>
          {bookMark === true ? <SBookMarkBtn1 /> : <SbookMarkBtnAdd1 />}
        </div>
      )}
    </>
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
const SBookMarkBtn1 = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmarkadd});
`;

const SbookMarkBtnAdd = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmark});
  cursor: pointer;
`;
const SbookMarkBtnAdd1 = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: cover;
  background-image: url(${blogbookmark});
`;
export default BlogBookMark;
