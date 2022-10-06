import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//이미지
import unlike from "../../assets/images/unlike.png";

const BlogHotList = () => {
  const hotcommunits = useSelector(state => state.blogSlice.hotBlog);
  /**
   * 히트게시물리스트 4개만 보여주기
   */
  const hotcommunity = hotcommunits.slice(0, 4);
  const navigate = useNavigate();

  return (
    <SBlogHotList>
      <SHotTitle>최근에 추천 많이 받은 게시글 🔥</SHotTitle>
      {hotcommunity?.map(hot => (
        <STitle key={hot.id}>
          <SText
            onClick={() => {
              navigate(`/blog/detail/${hot.id}`);
            }}
          >
            {hot.title}
          </SText>
          <SLike>
            <SLikeNum>{hot.like}</SLikeNum>
            <SImg />
          </SLike>
        </STitle>
      ))}
    </SBlogHotList>
  );
};

export default BlogHotList;

const SBlogHotList = styled.div``;

const SHotTitle = styled.div`
  font-size: 24px;
  margin: 36px 36px 26px 60px;
  margin-left: 60px;
  font-weight: 700;
`;
const STitle = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${props => props.theme.color.grey2};
  padding: 10px 0;
  margin: 0 50px;

  &:last-child {
    border-bottom: none;
  }
`;

const SText = styled.div`
  padding: 0 10px;
  cursor: pointer;
`;

const SLike = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const SLikeNum = styled.div`
  font-size: 16px;
  color: #9c9c9c;
`;
const SImg = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 5px;
  background-position: right center;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${unlike});
`;
