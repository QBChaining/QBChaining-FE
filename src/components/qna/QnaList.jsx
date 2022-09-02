import React from "react";
import { useNavigate } from "react-router-dom";
import QnaCommentList from "./QnaCommentList";
import QnaAddComment from "./QnaAddComment";
import styled from "styled-components";

const QnaList = ({ data, isDatail }) => {
  const navigate = useNavigate();
  return (
    <StextMain>
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <div>
          <button>즐겨찾기</button>
        </div>
        <div
          onClick={() => {
            !isDatail && navigate(`/qna/detail/${data.id}`);
          }}
        >
          <div>
            <div>{data.user?.user_name}</div>
            <div>{data.createdAt}</div>
          </div>
          <div className="ql-snow">
            <div>{data.title}</div>
            {isDatail && (
              <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: data.content }}
              ></div>
            )}
          </div>
        </div>
        <div>
          <div>{data.category}</div>
          <div>{data.honeytip}</div>
          <div>
            {data.tag?.map(data => {
              return <div>{data}</div>;
            })}
          </div>
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
    </StextMain>
  );
};

export default QnaList;

const StextMain = styled.div`
  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;
