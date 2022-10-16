import React from "react";
import styled from "styled-components";

//이미지
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";
import BookmarkNoFillIcon from "../../assets/images/BookmarkNoFillIcon.png";
type TQnaBookmarkButton = {
  is_bookmark: boolean;
  id: number;
  resolve: boolean;
  type: string;
};
const QnaBookmarkButton = ({
  is_bookmark,
  id,
  resolve,
  type,
}: TQnaBookmarkButton) => {
  return (
    <SBookmarkIcon
      type={type}
      isBookmark={is_bookmark}
      isResolve={resolve}
    ></SBookmarkIcon>
  );
};

export default QnaBookmarkButton;

const SBookmarkIcon = styled.div<{
  type: string;
  isBookmark: boolean;
  isResolve: boolean;
}>`
  width: 30px;
  height: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${props =>
    props.isBookmark ? BookmarkFillIcon : BookmarkNoFillIcon});
`;
