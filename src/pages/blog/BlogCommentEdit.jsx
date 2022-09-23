import React, { useEffect, useDispatch } from "react";
import EditorComponent from "../../components/common/EditorComponent";
import { useParams } from "react-router-dom";
import ModalBookmark from "../../components/common/ModalBookmark";
import styled from "styled-components";
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const BlogCommunityEdit = () => {
  const blogEditData = useSelector(state => state.blogSlice.blogDetail);
  console.log(blogEditData);
  const { id } = useParams();

  return (
    <SEdit>
      <Helmet>
        <title>Blog Edit</title>
      </Helmet>
      <STitledSet>
        <h2 className="title">게시글 수정하기</h2>
        <EditorComponent
          blogEditData={blogEditData}
          blogEditId={id}
          isBlogEdit={true}
        ></EditorComponent>
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
