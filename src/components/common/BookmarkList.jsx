import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getBookmarkListDB } from "./../../redux/async/qna";
import styled from "styled-components";

const BookmarkList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookmarkListDB());
  }, []);
  return (
    <SBookmarkList>
      <h2>개발일지</h2>
      <div>블로그</div>
      <h2>Q&A</h2>
      <div>Q&A</div>
    </SBookmarkList>
  );
};

export default BookmarkList;

const SBookmarkList = styled.div`
  color: white;
`;
