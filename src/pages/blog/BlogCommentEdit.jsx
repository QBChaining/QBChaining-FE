import React, { useEffect, useDispatch } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

//컴포넌트
import ModalBookmark from "../../components/common/ModalBookmark";
import EditorComponent from "../../components/common/EditorComponent";

//이미지
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";

const BlogCommunityEdit = () => {
  const blogEditData = useSelector(state => state.blogSlice.blogDetail);
  const { id } = useParams();

  return (
    <SEdit>
      sdfsdfsd
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
