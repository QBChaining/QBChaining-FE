import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import Editor from "../../components/common/Editor";
import axios from "axios";
import qnaSlice from "./../../redux/modules/qnaSlice";
import {getOneQnaListDB, getQnaListDB} from "./../../redux/async/qna";

const QnaEdit = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const [originData, setOriginData] = useState();

  const list = useSelector((state) => state.qnaSlice);

  // const getList = async () => {
  //   const response = await axios.get("http://localhost:5000/posts");
  //   console.log(response.data);
  //   const post = response.data;
  //   const targetPost = post.find((data) => parseInt(data.id) === parseInt(id));
  //   setOriginData(targetPost);
  // };

  useEffect(() => {
    // getList();
    dispatch(getOneQnaListDB(id))
      .then((result) => {
        setOriginData(result.payload[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
  // console.log(originData);

  if (originData) {
    return <Editor isEdit={true} originData={originData} />;
  } else {
    return <Editor />;
  }
};

export default QnaEdit;
