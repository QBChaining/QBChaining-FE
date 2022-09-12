import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogDB } from "../../redux/async/blog";
// import styled from "styled-components";
import BlogMyList from "../../components/blog/BlogMyList";
import BlogBookMarkList from "../../components/blog/BlogBookMarkList";

const BlogMy = () => {
  const dispatch = useDispatch();
  useEffect(id => {
    dispatch(getMyBlogDB(id));
  }, []);
  return (
    <div>
      <BlogBookMarkList />
    </div>
  );
};

export default BlogMy;
