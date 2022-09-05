import React, { useEffect } from "react";
import styled from "styled-components";
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
const BlogCommunityDetail = () => {
  const response = useSelector(state => state.blogSlice.blogList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogDetailDB());
  }, []);
  return (
    <div>
      <STopBox>
        <div>BlogPersonalMain</div>
        <div>
          <div>홍길동</div>
          <div></div>
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
