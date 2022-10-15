import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "redux/config/configStore";

//컴포넌트
import EditorComponent from "../../components/common/EditorComponent";

//통신
import { getOneQnaListDB } from "../../redux/async/qna";

const QnaEdit = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const [editData, setEditData] = useState({});

  //qnatarget 구독
  const target = useSelector((state: RootState) => state.qnaSlice.qnaTarget);

  //최초로딩시  타겟게시글 정보 요청
  useEffect(() => {
    dispatch(getOneQnaListDB(parseInt(id)));
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
