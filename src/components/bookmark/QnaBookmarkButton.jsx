import React from "react";
import styled from "styled-components";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
import GreyBookmarkFillIcon from "../../assets/images/GreyBookmarkFillIcon.png";
import GreyBookmarkNoFillIcon from "../../assets/images/GreyBookmarkNoFillIcon.png";
import blogbookmark from "../../assets/images/blogbookmark.png";
import bookmarkadd from "../../assets/images/bookmarkadd.png";
const QnaBookmarkButton = ({ is_bookmark, id, resolve, type }) => {
  return (
    <SBookmarkIcon
      type={type}
      isBookmark={is_bookmark}
      isResolve={resolve}
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
    props.type === "qna"
      ? props.isResolve
        ? props.isBookmark
          ? BookmarkFillIcon
          : BookmarkNoFillIcon
        : props.isBookmark
        ? GreyBookmarkFillIcon
        : GreyBookmarkNoFillIcon
      : props.isBookmark
      ? bookmarkadd
      : blogbookmark});
`;
