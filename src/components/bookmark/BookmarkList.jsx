import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkListDB } from "../../redux/async/qna";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import WriteBookmark from "./WriteBookmark";
import BookmarkListItem from "./BookmarkListItem";

const BookmarkList = () => {
  const dispatch = useDispatch();
  const qnaBookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  useEffect(() => {
    dispatch(getBookmarkListDB());
  }, []);

  console.log(qnaBookmarkList);

  return (
    <SBookmarkList>
      <h2>개발일지</h2>
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
        </ul>
      </div>
      <h2>Q&A</h2>
      <div>
        <ul>
          {qnaBookmarkList.map(data => (
            <BookmarkListItem key={data.qna_id} data={data} />
          ))}
        </ul>
      </div>
    </SBookmarkList>
  );
};

export default BookmarkList;

const SBookmarkList = styled.div`
  color: white;
`;
