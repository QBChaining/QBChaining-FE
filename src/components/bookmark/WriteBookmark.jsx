import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCommentListDB, getOneQnaListDB } from "../../redux/async/qna";
import { useSelector } from "react-redux";
import styled from "styled-components";

const WriteBookmark = ({ id, onToggleHandler }) => {
  const dispatch = useDispatch();
  const { qnaTarget } = useSelector(state => state.qnaSlice);
  const { commentList } = useSelector(state => state.qnaSlice);

  useEffect(() => {
    dispatch(getOneQnaListDB(id));
    dispatch(getCommentListDB(id));
  }, []);

  return (
    <SWriteBookmark>
      <button onClick={onToggleHandler}>뒤로가기</button>
      <div
        style={{
          padding: "20px",
          border: "1px solid white",
          maxHeight: "60vh",
          overflow: "auto",
        }}
      >
        질문
        <div>{qnaTarget.title}</div>
        <div>{qnaTarget.honey_tip}</div>
        <div dangerouslySetInnerHTML={{ __html: qnaTarget.content }}></div>
      </div>
      <div style={{ padding: "20px", border: "1px solid white" }}>
        댓글
        {commentList.map(data => (
          <div
            key={data.id}
            style={{ padding: "20px", border: "1px solid white" }}
          >
            <div>{data.title}</div>
            <div dangerouslySetInnerHTML={{ __html: data.comment }}></div>
          </div>
        ))}
      </div>
    </SWriteBookmark>
  );
};

export default WriteBookmark;

const SWriteBookmark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: auto;
`;
