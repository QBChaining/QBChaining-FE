import React from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";

const QnaList = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div style={{ border: "1px solid black", padding: "20px" }}>
      <div
        onClick={() => {
          navigate(`/qna/detail/${data.id}`);
        }}
      >
        <div>
          <div>user_name</div>
          <div>craetedAt</div>
        </div>
        <div className="ql-snow">
          <div>{data.title}</div>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      </div>
      <div>
        <div>category</div>
        <div>honeytip</div>
        <div>cntcomment</div>
        <div>tag:[123,145,26]</div>
      </div>
      <button
        style={{ display: "block" }}
        onClick={() => {
          navigate(`/qna/edit/${data.id}`);
        }}
      >
        수정하기
      </button>
    </div>
  );
};

export default QnaList;
