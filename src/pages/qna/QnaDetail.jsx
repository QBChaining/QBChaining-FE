import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneQnaListDB } from "../../redux/async/qna";
import QnaList from "./../../components/qna/QnaList";
import QnaAddComment from "./../../components/qna/QnaAddComment";
import QnaCommentList from "./../../components/qna/QnaCommentList";

const QnaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const target = useSelector(state => state.qnaSlice.qnaTarget);

  useEffect(() => {
    dispatch(getOneQnaListDB(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (target) {
      setData(target[0]);
    }
  }, [target]);

  return (
    <div>
      {data && <QnaList data={data} />}
      <QnaAddComment qnaId={id} />
      <QnaCommentList qnaId={id} />
    </div>
  );
};

export default QnaDetail;
