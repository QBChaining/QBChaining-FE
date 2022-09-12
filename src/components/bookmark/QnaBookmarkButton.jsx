import React from "react";
import styled from "styled-components";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
const QnaBookmarkButton = ({ is_bookmark, id }) => {
  return (
    <SBookmarkIcon
      isBookmark={is_bookmark}
      BookmarkFillIcon={BookmarkFillIcon}
      BookmarkNoFillIcon={BookmarkNoFillIcon}
    ></SBookmarkIcon>
  );
};

export default QnaBookmarkButton;

const SBookmarkIcon = styled.div`
  width: 30px;
  height: 30px;
  background-image: url(${props =>
    props.isBookmark ? props.BookmarkFillIcon : props.BookmarkNoFillIcon});
`;
