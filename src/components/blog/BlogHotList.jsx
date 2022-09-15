import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getHotBlogDB } from "../../redux/async/blog";
import unlike from "../../assets/images/unlike.png";
const BlogHotList = () => {
  const hotcommunits = useSelector(state => state.blogSlice.hotBlog);
  const hotcommunity = hotcommunits.slice(0, 4);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getHotBlogDB());
  }, []);
  return (
    <div>
      <SHotTitle>최근에 추천 많이 받은 게시글 🔥</SHotTitle>
      {hotcommunity?.map(hot => {
        return (
          <div key={hot.id}>
            <STitle>
              <SText>{hot.title}</SText>
              <SLike>
                <SLikeNum>{hot.like}</SLikeNum>
                <SImg />
              </SLike>
            </STitle>
          </div>
        );
      })}
    </div>
  );
};
const SHotTitle = styled.div`
  font-size: 24px;
  margin-left: 60px;
  margin: 36px 36px;
`;
const STitle = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #dcdcdc;
  width: 926px;
  left: 250px;
  top: 270px;
  margin: 12px auto 20px 50px;
`;

const SText = styled.div`
  font-size: 18px;
  margin-left: 10px;
  margin-bottom: 9px;
`;

const SLike = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
`;
const SLikeNum = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
  margin-right: 5px;
  margin-bottom: 9px;
`;
const SImg = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background-position: center;
  background-size: 20px 20px;
  background-image: url(${unlike});
`;

export default BlogHotList;
