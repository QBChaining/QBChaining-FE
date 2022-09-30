import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

//컴포넌트
import BookmarkListItem from "./BookmarkListItem";

//통신
import { getBookmarkListDB } from "../../redux/async/qna";

const BookmarkList = () => {
  const dispatch = useDispatch();
  const qnaBookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  useEffect(() => {
    dispatch(getBookmarkListDB());
  }, []);

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
