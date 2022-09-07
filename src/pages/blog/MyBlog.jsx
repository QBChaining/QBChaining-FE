import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BlogList from "../../components/blog/MyBlogList";
const MyBlog = () => {
  const myBlogLists = useSelector(state => state.blogSlice.myblog);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(id => {
    dispatch(getMyBlogDB(id));
  }, []);
  return (
    <div>
      {myBlogLists?.map(myco => (
        <BlogList blogList={myco} key={myco.id} />
      ))}
      <div></div>
      <div>태그아직데이터에 안들어옴</div>
      <div></div>
    </div>
  );
};

//현재 보류 중, components/blog/MyBloglist 완성 이후 지움.
{
  /* <SCard>
  <div>{myco.title}</div>
  <div>{myco.content}</div>
  <div>
    <div>Java</div>
  </div>
</SCard>
</BlogList> */
}

export default MyBlog;
