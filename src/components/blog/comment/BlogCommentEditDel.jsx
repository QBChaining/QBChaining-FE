import React from "react";
import styled from "styled-components";
import {
  patchBlogCommentDB,
  deleteBlogCommentDB,
} from "../../../redux/async/blog";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const CommentEditDel = ({ comments }) => {
  const [show, setShow] = React.useState(false);
  const { postId } = useParams();

  const editRef = React.useRef();
  const dispatch = useDispatch();

  //댓글 수정 완료 버튼
  const onClickEditHandler = () => {
    dispatch(
      patchBlogCommentDB({
        comment: editRef.current.value,
        postId,
      }),
    );
  };

  //댓글 삭제 버튼
  const onClickDeleteHandler = () => {
    console.log(comments.commentId);
    dispatch(deleteBlogCommentDB(comments.commentId));
  };
  return (
    <form>
      {!show ? (
        <SCommentList>
          <div>프로필사진</div>
          <div>홍길동</div>
          <div>👍</div>
          <small>{comments.comment}</small>
          <div>
            <button
              type="button"
              onClick={() => {
                setShow(!show);
              }}
            >
              수졍
            </button>
            <button
              onClick={() => {
                onClickDeleteHandler(comments.commentsId);
              }}
            >
              삭제
            </button>
          </div>
        </SCommentList>
      ) : (
        <>
          <div>프로필사진</div>
          <div>홍길동</div>
          <div>👍</div>
          <input type="text" placeholder={comments.comment} ref={editRef} />
          <div>
            <button
              type="button"
              onClick={() => {
                onClickEditHandler();
                setShow(!show);
              }}
            >
              완료
            </button>
            <button>삭제</button>
          </div>
        </>
      )}
    </form>
  );
};

const SCommentList = styled.div`
  border: 1px solid black;
`;
export default CommentEditDel;
