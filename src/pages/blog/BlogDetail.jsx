import React from "react";
import styled from "styled-components";
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import { useNavigate } from "react-router-dom";
const BlogCommunityDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <STopBox>
        <div>BlogPersonalMain 페이지입니다</div>
        <div>
          <div>홍길동</div>
          <div>date</div>
          <div>프로필사진</div>
        </div>
        <button
          onClick={() => {
            navigate("/blog/edit/");
          }}
        >
          블로그게시글수정
        </button>
        <div>
          <CommentAdd />
          <CommentList />
        </div>
      </STopBox>
    </div>
  );
};
const STopBox = styled.div`
  border: 1px solid black;
`;
export default BlogCommunityDetail;
