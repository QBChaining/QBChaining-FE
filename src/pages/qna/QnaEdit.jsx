import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import EditorComponent from "../../components/common/EditorComponent";
import axios from "axios";
import qnaSlice from "./../../redux/modules/qnaSlice";
import { getOneQnaListDB, getQnaListDB } from "./../../redux/async/qna";

const QnaEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [editData, setEditData] = useState();

  //qnatarget 구독
  const target = useSelector(state => state.qnaSlice.qnaTarget);

  //최초로딩시  타겟게시글 정보 요청
  useEffect(() => {
    dispatch(getOneQnaListDB(id));
  }, [id]);

  //타겟이 있다면 원본데이터 props전달목적
  useEffect(() => {
    setEditData(target);
  }, [target]);

  if (editData) {
    return <EditorComponent isEdit={true} editData={editData} />;
  } else {
    return <EditorComponent />;
  }
};

export default QnaEdit;
