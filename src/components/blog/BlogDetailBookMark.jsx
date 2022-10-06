import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getToday } from "./../../utils/today";

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

const BlogBookMark = ({ target, isbookmark, isdetailbookmark, ismainlist }) => {
  const { isLogin } = useSelector(state => state.userSlice);

  const dispatch = useDispatch();
  const { id } = useParams();

  const totalData = {
    id: target.id,
    title: target.title,
    user_name: target.userName,
    createdAt: getToday(),
  };

  const onAddBookMark = () => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postBlogBookMarkDB(totalData));
  };
  const onDeleteBookMark = () => {
    dispatch(deleteBlogBookMarkDB(id));
  };

  return (
    <>
      <div>
        {isbookmark === true ? (
          <SBookMarkBtn onClick={onDeleteBookMark} />
        ) : (
          <SbookMarkBtnAdd onClick={onAddBookMark} />
        )}
      </div>
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
  width: 25px;
  height: 25px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmark});
  cursor: pointer;
`;

export default BlogBookMark;
