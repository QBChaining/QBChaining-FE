import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogDB } from "../../redux/async/blog";
// import styled from "styled-components";
import BlogBookMarkList from "../../components/blog/BlogBookMarkList";
import BlogHotList from "../../components/blog/BlogHotList";
const BlogMy = () => {
  const dispatch = useDispatch();
  useEffect(id => {
    dispatch(getMyBlogDB(id));
  }, []);
  return (
    <div>
      <BlogBookMarkList />
      <BlogHotList />
    </div>
  );
};

export default BlogMy;
