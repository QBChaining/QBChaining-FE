import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommentListDB } from "./../../redux/async/qna";

const QnaCommentList = ({ qnaId }) => {
  const dispatch = useDispatch();

  //commentList 구독
  const a = useSelector(state => state.qnaSlice.commentList);

  useEffect(() => {
    dispatch(getCommentListDB(qnaId));
  }, [qnaId]);

  return (
    <div className="ql-snow">
      {a.map(data => (
        <div className="ql-editor">
          <div
            key={data.id}
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default QnaCommentList;
