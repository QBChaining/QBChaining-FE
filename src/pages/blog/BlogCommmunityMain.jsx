import React from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";

const BlogCommmunityMain = () => {
  const blog = useSelector((state) => state);
  console.log(blog);
  return <div>개발일지를 공유해요</div>;
};

export default BlogCommmunityMain;
