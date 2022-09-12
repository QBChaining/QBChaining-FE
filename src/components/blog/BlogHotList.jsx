import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getHotBlogDB } from "../../redux/async/blog";
const BlogHotList = () => {
  const hotcommunity = useSelector(state => state);
  console.log("최근", hotcommunity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotBlogDB());
  }, []);
  return (
    <div>
      {/* <SHotTitle>최근에 추천 많이 받은 게시글 🔥</SHotTitle>
      {hotcommunity?.map(hot => {
        return (
          <div key={hot.id}>
            <STitle>{hotcommunity?.title}</STitle>
          </div>
        );
      })} */}
    </div>
  );
};
const SHotTitle = styled.div`
  font-size: 24px;
`;
const STitle = styled.div`
  font-size: 18px;
`;
export default BlogHotList;
