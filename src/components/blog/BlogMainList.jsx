import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ToastViewer from "../editor/ToastViewer";
import BlogBookMark from "./BlogBookMark";
const BlogMainList = ({ posts }) => {
  const userProfile = useSelector(state => state.userSlice.userProfile);
  const navigate = useNavigate();
  return (
    <div>
      <SBloglist>
        <SContentsGroup>
          <div>
            <SPTitleBox>
              <SProfile url={userProfile} />
              <div
                className="title"
                onClick={() => {
                  navigate(`/blog/detail/${posts.id}`);
                }}
              >
                {posts.title}
              </div>
            </SPTitleBox>
          </div>
          <STagNMark>
            <STagList>
              {posts.tag?.map((tags, i) => {
                return (
                  <div key={i}>
                    <STag>{tags}</STag>
                  </div>
                );
              })}
            </STagList>
            <SBookMark>
              <BlogBookMark isbookmark={posts.is_bookmark} posts={posts} />
            </SBookMark>
          </STagNMark>
        </SContentsGroup>
      </SBloglist>
    </div>
  );
};

const SBloglist = styled.div`
  width: 743px;
  height: 127px;
  background: #ffffff;
  margin: 36px 0 36px 40px;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  left: 200px;
`;

const SContent = styled.div`
  width: 283px;
  height: 101px;
  overflow: hidden;
`;

const SProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.grey3};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 11px;
`;
const STagList = styled.div`
  background-color: black;
  width: 300px;
  display: flex;
  flex-direction: row;
`;
const STag = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  width: 108px;
  height: 39px;
  /* margin-right: 15px; */
  background: #c0c0c0;
  border-radius: 30px;
`;
const SBookMark = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-left: 0px;
  margin-top: 20px;
`;

const SContentsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 20px 28px 20px 28px;
`;

const SPTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  & .title {
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 20px;
    cursor: pointer;
  }
`;
const Sprofile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.url});
  width: 20px;
  height: 20px;
`;

const STagNMark = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300px;
  height: 100px;
`;

export default BlogMainList;
