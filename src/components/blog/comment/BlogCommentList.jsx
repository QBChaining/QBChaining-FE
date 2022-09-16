import React, { useEffect } from "react";
// import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogCommentListDB } from "../../../redux/async/blog";
import CommentEditDel from "./BlogCommentEditDel";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const CommentList = () => {
  const commentLists = useSelector(state => state.blogSlice.commentList);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getBlogCommentListDB(id));
  }, [dispatch]);

  return (
    <SCommentWrapper>
      {commentLists?.map(comments => (
        <SCommentList key={comments.id}>
          <div key={comments.id}>
            <CommentEditDel comments={comments} />
          </div>
        </SCommentList>
      ))}
    </SCommentWrapper>
  );
};

const SCommentList = styled.div`
  padding: 20px 0;
`;

const SCommentWrapper = styled.div`
  padding: 20px 0;
`;
export default CommentList;
