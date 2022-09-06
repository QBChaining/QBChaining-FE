import React from "react";
import Editor from "../../components/common/Editor";
import { useParams } from "react-router-dom";
const BlogCommunityEdit = () => {
  const { id } = useParams();

  return (
    <div>
      <Editor blogEditId={id} isBlogEdit={true}></Editor>
    </div>
  );
};

export default BlogCommunityEdit;
