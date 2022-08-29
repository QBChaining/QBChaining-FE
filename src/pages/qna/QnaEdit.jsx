import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Editor from "../../components/common/Editor";
import axios from "axios";
import qnaSlice from "./../../redux/modules/qnaSlice";
import { getOneQnaListDB, getQnaListDB } from "./../../redux/async/qna";

const QnaEdit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [originData, setOriginData] = useState();

  const target = useSelector((state) => state.qnaSlice.qnaTarget);

  // const getList = async () => {
  //   const response = await axios.get("http://localhost:5000/posts");
  //   console.log(response.data);
  //   const post = response.data;
  //   const targetPost = post.find((data) => parseInt(data.id) === parseInt(id));
  //   setOriginData(targetPost);
  // };

  useEffect(() => {
    dispatch(getOneQnaListDB(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (target) {
      setOriginData(target[0]);
    }
  }, [target]);

  if (originData) {
    return <Editor isEdit={true} originData={originData} />;
  } else {
    return <Editor />;
  }
};

export default QnaEdit;
