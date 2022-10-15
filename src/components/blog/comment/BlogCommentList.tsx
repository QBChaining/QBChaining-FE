import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RootState, AppDispatch } from "redux/config/configStore";

//컴포넌트
import CommentEditDel from "./BlogCommentEditDel";

//통신
import { getBlogCommentListDB } from "../../../redux/async/blog";

const CommentList = () => {
  const commentLists = useSelector(
    (state: RootState) => state.blogSlice.commentList,
  );

  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getBlogCommentListDB(parseInt(id)));
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
