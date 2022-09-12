import React from "react";
import Editor from "../../components/common/Editor";
// import Tag from "../../components//blog/Tag";

const BlogCommunityWrite = () => {
  return (
    <div>
      <div>
        <h1>블로그 업로드</h1>
      </div>
      <Editor isBlogWrite={true} />
    </div>
  );
};

export default BlogCommunityWrite;
