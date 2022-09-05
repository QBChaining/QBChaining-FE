import React, { useEffect } from "react";
import styled from "styled-components";
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
const BlogCommunityDetail = () => {
  const response = useSelector(state => state.blogSlice.blogList);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBlogDetailDB(id));
  }, [dispatch]);

  return (
    <div>
      <STopBox>
        <div>BlogPersonalMain</div>
        <div>
          <div>{response.title}</div>
          <div>{response.content}</div>
          <div>{response.createdAt}</div>
          <div>{response.User?.user_name}</div>
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
