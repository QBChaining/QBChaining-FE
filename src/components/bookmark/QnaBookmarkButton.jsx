import React from "react";
import styled from "styled-components";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
import GreyBookmarkFillIcon from "../../assets/images/GreyBookmarkFillIcon.png";
import GreyBookmarkNoFillIcon from "../../assets/images/GreyBookmarkNoFillIcon.png";
const QnaBookmarkButton = ({ is_bookmark, id, resolve }) => {
  return (
    <SBookmarkIcon
      isBookmark={is_bookmark}
      isResolve={resolve}
      BookmarkFillIcon={BookmarkFillIcon}
      BookmarkNoFillIcon={BookmarkNoFillIcon}
      GreyBookmarkFillIcon={GreyBookmarkFillIcon}
      GreyBookmarkNoFillIcon={GreyBookmarkNoFillIcon}
    ></SBookmarkIcon>
  );
};

export default QnaBookmarkButton;

const SBookmarkIcon = styled.div`
  width: 30px;
  height: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props =>
    props.isResolve
      ? props.isBookmark
        ? props.BookmarkFillIcon
        : props.BookmarkNoFillIcon
      : props.isBookmark
      ? props.GreyBookmarkFillIcon
      : props.GreyBookmarkNoFillIcon});
`;
