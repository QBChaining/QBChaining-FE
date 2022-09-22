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
import { getToday } from "./../../utils/today";
const BlogBookMark = ({ target, isbookmark, isdetailbookmark, ismainlist }) => {
  const [bookMark, setBookMark] = useState(isbookmark);
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.userSlice);
  const { id } = useParams();

  const totalData = {
    id: target.id,
    title: target.title,
    user_name: target.user_name,
    createdAt: getToday(),
  };

  const onAddBookMark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogBookMarkDB(totalData));
    setBookMark(!bookMark);
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(id));
    setBookMark(!bookMark);
  };

  return (
    <>
      {/* {isdetailbookmark ? ( */}
      <div>
        {bookMark === true ? (
          <SBookMarkBtn onClick={onDeleteBookMark} />
        ) : (
          <SbookMarkBtnAdd onClick={onAddBookMark} />
        )}
      </div>
      {/* ) : (
        <div>
          {bookMark === true ? <SBookMarkBtn1 /> : <SbookMarkBtnAdd1 />}
        </div>
      )} */}
    </>
  );
};
const SBookMarkBtn = styled.div`
  width: 25px;
  height: 25px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmarkadd});
  cursor: pointer;
`;

const SbookMarkBtnAdd = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmark});
  cursor: pointer;
`;
// const SBookMarkBtn1 = styled.div`
//   width: 30px;
//   height: 30px;
//   background-position: center;
//   background-size: contain;
//   background-image: url(${blogbookmarkadd});
//   cursor: pointer;
// `;
// const SbookMarkBtnAdd1 = styled.div`
//   width: 30px;
//   height: 30px;
//   background-position: center;
//   background-size: contain;
//   background-image: url(${blogbookmark});
// `;
export default BlogBookMark;
