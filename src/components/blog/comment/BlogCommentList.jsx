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
    <div>
      {commentLists?.map(comments => (
        <SCommentList key={comments.id}>
          <div key={comments.id}>
            <CommentEditDel comments={comments} />
          </div>
        </SCommentList>
      ))}
    </div>
  );
};

const SCommentList = styled.div`
  width: 1046px;
  height: 148px;
  background: #dcdcdc;
  border-radius: 20px;
  margin: 20px 87px 0px 87px;
`;
export default CommentList;
