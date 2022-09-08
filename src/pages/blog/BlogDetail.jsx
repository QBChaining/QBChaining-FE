import React, { useEffect } from "react";
import styled from "styled-components";
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
import { deleteBlogCommunityDB } from "../../redux/async/blog";
const BlogCommunityDetail = () => {
  const response = useSelector(state => state.blogSlice.blogDetail);
  console.log("디테일", response);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  //게시글 삭제

  const deleteBlogPost = () => {
    dispatch(deleteBlogCommunityDB(parseInt(id)));
  };
  useEffect(() => {
    dispatch(getBlogDetailDB(id));
  }, []);

  return (
    <form>
      <STopBox>
        <div>BlogPersonalMain</div>
        <div>
          <div>{response?.title}</div>
          <div>{response?.content}</div>
          <div>{response?.createdAt}</div>
          <div
            onClick={() => {
              navigate(`/blog/my/${id}}`);
            }}
          >
            {response?.User?.user_name}
            <SProfile></SProfile> <div>프로필사진</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            navigate(`/blog/edit/${id}`);
          }}
        >
          블로그게시글수정
        </button>
        <button
          type="button"
          onClick={id => {
            navigate("/blog");
            deleteBlogPost(id);
          }}
        >
          삭제하기
        </button>
        <div>
          <CommentAdd />
          <CommentList />
        </div>
      </STopBox>
    </form>
  );
};
const STopBox = styled.div`
  border: 1px solid black;
`;
const SProfile = styled.div`
  background-color: lightgray;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  border: 0.1px solid white;
`;
export default BlogCommunityDetail;
