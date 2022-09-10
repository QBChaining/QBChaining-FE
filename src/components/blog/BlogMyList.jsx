import React from "react";
import styled from "styled-components";
const BlogMyList = ({ blogList }) => {
  return (
    <div>
      <STag>태그리스트</STag>
      <SCardList>
        <div>{blogList.title}</div>
        <div>{blogList.content}</div>
        <div>tag</div>
      </SCardList>
    </div>
  );
};

const STag = styled.div``;
const SCardList = styled.div``;
export default BlogMyList;
