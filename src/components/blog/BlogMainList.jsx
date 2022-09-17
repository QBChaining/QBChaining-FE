import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ToastViewer from "../editor/ToastViewer";
import BlogBookMark from "./BlogBookMark";
import unlike from "../../assets/images/unlike.png";
import { getBlogDetailDB } from "../../redux/async/blog";
const BlogMainList = ({ posts }) => {
  const userProfile = useSelector(state => state.userSlice.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <SBloglist>
      <SContentsGroup>
        <SPTitleBox>
          <SUserInfo>
            <SProfile url={posts.profile_img} />
            <SContentTitle
              className="title"
              onClick={() => {
                navigate(`/blog/detail/${posts.id}`);
              }}
            >
              {posts.title}
            </SContentTitle>
          </SUserInfo>
          <SBookMark>
            <BlogBookMark
              ismainlist={true}
              isbookmark={posts.is_bookmark}
              posts={posts}
            />
          </SBookMark>
        </SPTitleBox>
        <STagNMark>
          <STagList>
            {posts.tag?.map((tags, i) => (
              <STag key={i}>{tags}</STag>
            ))}
          </STagList>
          <SLike>{posts.like}</SLike>
        </STagNMark>
      </SContentsGroup>
    </SBloglist>
  );
};

export default BlogMainList;

const SBloglist = styled.div`
  width: 100%;
  min-width: 700px;
  background: #ffffff;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 20px 30px 10px 30px;
  margin-bottom: 20px;
`;

const SPTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SProfile = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.grey3};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 10px;
`;

const SContentTitle = styled.div`
  font-size: 20px;
  cursor: pointer;
`;
const STagList = styled.div`
  display: flex;
  padding-left: 47px;
`;
const STag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  /* margin-right: 15px; */
  padding: 10px 13px;
  background: #c0c0c0;
  border-radius: 30px;
  margin: 0 10px 10px 0;
`;
const SBookMark = styled.div``;

const SContentsGroup = styled.div``;
const Sprofile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${props => props.url});
  width: 20px;
  height: 20px;
`;

const STagNMark = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
`;

const SLike = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
  color: ${props => props.theme.color.grey5};
  padding-right: 23px;
  background-image: url(${unlike});
  background-position: bottom 13px right 0;
  background-repeat: no-repeat;
`;
