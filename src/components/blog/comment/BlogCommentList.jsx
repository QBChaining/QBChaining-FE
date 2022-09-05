import React from "react";
// import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogCommentListDB } from "../../../redux/async/blog";
import CommentEditDel from "./BlogCommentEditDel";
import { useParams } from "react-router-dom";
// import { containerRegistryDomain } from "firebase-tools/lib/api";

// get,
const CommentList = () => {
  const response = useSelector(state => state.blogSlice.commentList);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getBlogCommentListDB());
  }, [dispatch]);

  return (
    <div>
      {response?.map(comments => {
        return (
          <div key={comments.id}>
            <CommentEditDel comments={comments} />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
