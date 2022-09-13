import React from "react";
// import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogCommentListDB } from "../../../redux/async/blog";
import CommentEditDel from "./BlogCommentEditDel";
import { useParams } from "react-router-dom";
import styled from "styled-components";
//image
// import { containerRegistryDomain } from "firebase-tools/lib/api";

// get,
const CommentList = () => {
  const commentLists = useSelector(state => state.blogSlice.commentList);
  console.log(commentLists);
  const dispatch = useDispatch();
  const { id } = useParams();
  React.useEffect(() => {
    dispatch(getBlogCommentListDB(id));
  }, [dispatch]);

  return (
    <div>
      {commentLists?.map(comments => {
        return (
          <SCommentList>
            <div key={comments.id}>
              <CommentEditDel comments={comments} />
            </div>
          </SCommentList>
        );
      })}
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
