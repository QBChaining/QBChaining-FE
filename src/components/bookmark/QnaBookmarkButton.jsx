import React from "react";
import styled from "styled-components";

//이미지
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";

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
    props.isBookmark ? BookmarkFillIcon : BookmarkNoFillIcon});
`;
