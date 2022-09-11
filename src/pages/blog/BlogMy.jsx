import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogDB } from "../../redux/async/blog";
// import styled from "styled-components";
import BlogMyList from "../../components/blog/BlogMyList";

const BlogMy = () => {
  const myBlogLists = useSelector(state => state.blogSlice.myblog);
  const dispatch = useDispatch();
  useEffect(id => {
    dispatch(getMyBlogDB(id));
  }, []);
  return (
    <div>
      {myBlogLists?.map(myco => (
        <BlogMyList blogList={myco} key={myco.id} />
      ))}
      <div></div>
      <div>태그아직데이터에 안들어옴</div>
      <div></div>
    </div>
  );
};

export default BlogMy;
