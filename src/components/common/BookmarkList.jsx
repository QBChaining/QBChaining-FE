import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookmarkListDB } from "./../../redux/async/qna";

const BookmarkList = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getBookmarkListDB());
  // }, []);
  return <div>북마크리스트입니다</div>;
};

export default BookmarkList;
