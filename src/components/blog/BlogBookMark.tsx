import React from "react";
import styled from "styled-components";

//이미지
import blogbookmark from "../../assets/images/BookmarkNoFillIcon.png";
import blogbookmarkadd from "../../assets/images/BookmarkFillIcon.png";

const BlogBookMark = ({ isbookmark }: { isbookmark: boolean }) => {
  return (
    <>
      <div>{isbookmark === false ? <SBookMarkBtn /> : <SbookMarkBtnAdd />}</div>
    </>
  );
};
const SbookMarkBtnAdd = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmarkadd});
`;

const SBookMarkBtn = styled.div`
  width: 24px;
  height: 24px;
  background-position: center;
  background-size: contain;
  background-image: url(${blogbookmark});
`;

export default BlogBookMark;
