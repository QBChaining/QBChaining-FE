import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import {getBlogCommunityListDB} from "../../redux/async/blog";

const BlogCommmunityMain = () => {
  const blogList = useSelector((state) => state.blogSlice.blogList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCommunityListDB());
  }, []);

  return (
    <div>
      {/* {blogList && */}
      {blogList.map((posts) => {
        return (
          <div kye={posts.id}>
            <p>{posts.title}</p>
            <p>{posts.content}</p>
            <p>{posts.image}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCommmunityMain;
