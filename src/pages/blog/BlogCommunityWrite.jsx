import React, { useEffect } from "react";
import EditorComponent from "../../components/common/EditorComponent";
import ModalBookmark from "../../components/common/ModalBookmark";
import { colorSetBlue } from "../../redux/modules/userSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";
// import Tag from "../../components//blog/Tag";

const BlogCommunityWrite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(colorSetBlue());
  }, []);
  return (
    <STWrite>
      <STitleSet>
        <h2 className="title">새 게시글 작성하기</h2>
        <EditorComponent isBlogWrite={true} />
      </STitleSet>
      <ModalBookmark isWrite={true} />
    </STWrite>
  );
};
const STWrite = styled.div`
  display: flex;
`;
const STitleSet = styled.div`
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
export default BlogCommunityWrite;
