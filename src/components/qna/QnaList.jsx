import React from "react";
import { useNavigate } from "react-router-dom";

const QnaList = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        onClick={() => {
          navigate(`/qna/detail/${data.id}`);
        }}
      >
        <div className="ql-snow">
          <div dangerouslySetInnerHTML={{ __html: data.title }}></div>
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      </div>
      <button
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
