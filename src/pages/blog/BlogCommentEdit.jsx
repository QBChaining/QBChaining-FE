import React, { useEffect, useDispatch } from "react";
import Editor from "../../components/common/Editor";
import { useParams } from "react-router-dom";
import ModalBookmark from "../../components/common/ModalBookmark";
import styled from "styled-components";
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";
import { colorSetBlue } from "../../redux/modules/userSlice";

const BlogCommunityEdit = () => {
  const { id } = useParams();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(colorSetBlue());
  // }, []);
  return (
    <SEdit>
      <STitledSet>
        <h2 className="title">게시글 수정하기</h2>
        <Editor blogEditId={id} isBlogEdit={true}></Editor>
      </STitledSet>
      <ModalBookmark isWrite={true} />
    </SEdit>
  );
};
const SEdit = styled.div`
  display: flex;
`;
const STitledSet = styled.div`
  margin-left: 200px;
  margin-right: 200px;
  flex: 1;
  & .title {
    margin-top: 40px;
    margin-bottom: 50px;
    font-size: 30px;
    font-weight: 600;
    background-image: url(${QnaWriteIcon});
    background-repeat: no-repeat;
    background-position: left center;
    padding-left: 38px;
  }
`;
export default BlogCommunityEdit;
