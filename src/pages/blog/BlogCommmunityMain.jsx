import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getBlogCommunityListDB,
  getBlogDetailDB,
} from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToastViewer from "../../components/editor/ToastViewer";
import BlogBookMark from "../../components/blog/BlogBookMark";
import react from "../../assets/images/icon/react.png";
import BlogHotList from "../../components/blog/BlogHotList";
import blogplus from "../../assets/images/blogplus.png";
import ModalBookmark from "../../components/common/ModalBookmark";
import { colorSetBlue } from "../../redux/modules/userSlice";
import BlogMainList from "../../components/blog/BlogMainList";
const BlogCommmunityMain = () => {
  const blogMainLists = useSelector(state => state.blogSlice.blogList);
  const userProfile = useSelector(state => state.userSlice.userProfile);
  // const resolveList = blogMainLists.filter(data => data.is_resolve);
  const targetData = useSelector(state => state.blogSlice.blogDetail);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(getBlogCommunityListDB());
    dispatch(colorSetBlue());
  }, [dispatch]);
  //머지

  const getBlogDetail = id => {
    dispatch(getBlogDetailDB(id));
  };

  console.log(targetData);

  return (
    <SBlogCommmunityMain>
      <STopBox>
        <STopBoxWrapper>
          <SRecommend>
            <BlogHotList />
          </SRecommend>
          <STopHelper
            onClick={() => {
              navigate("/blog/write");
            }}
          >
            <SHelpText>게시글을 작성해 보세요!</SHelpText>
            <SHelpSubText>
              클릭하시면 블로그 작성페이지로 이동합니다.
            </SHelpSubText>
            <SPlus />
          </STopHelper>
        </STopBoxWrapper>
      </STopBox>
      <SBody>
        <SContentFilter>
          <ul>
            <li>추천순</li>
            <li>시간순</li>
          </ul>
        </SContentFilter>
        <SContentWrapper>
          <SLeftContainer>
            <SUserInfo>
              <SProfile url={userProfile} />
              <SPreviewTitle targetData={targetData}>
                HTML은 뭐하는건가요
              </SPreviewTitle>
            </SUserInfo>
            <SPreviewContent>
              <ToastViewer />
            </SPreviewContent>
          </SLeftContainer>
          <SRightContainer>
            {blogMainLists?.map(posts => (
              <BlogMainList
                onClick={() => {
                  getBlogDetail(posts.id);
                }}
                posts={posts}
                key={posts.id}
              />
            ))}
          </SRightContainer>
        </SContentWrapper>
      </SBody>
      <ModalBookmark />
    </SBlogCommmunityMain>
  );
};

export default BlogCommmunityMain;
//전체

const SBlogCommmunityMain = styled.div``;

//탑박스
const STopBox = styled.div`
  position: relative;
  background-color: #2676ed;
  padding-top: 40px;
  padding-bottom: 60px;
  //라인
  &::before {
    content: "";
    position: absolute;
    top: 0%;
    left: 50%;
    width: calc(100% - 88px);
    transform: translateX(-50%);
    height: 1px;
    background-color: ${props => props.theme.color.white};
  }
`;

const STopBoxWrapper = styled.div`
  display: flex;
  max-width: 1540px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SRecommend = styled.div`
  flex: 1;
  min-width: 600px;
  height: 300px;
  background: #ffffff;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
`;

const STopHelper = styled.div`
  min-width: 420px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 61px;
  color: ${props => props.theme.color.white};
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 30px;
  cursor: pointer;
`;

const SHelpText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 95px;
`;

const SHelpSubText = styled.div`
  font-size: 20px;
  font-weight: 100;
  margin-top: 5px;
`;

const SBody = styled.div`
  width: 1560px;
  padding: 0 20px;
  margin: 0 auto;
`;

const SContentFilter = styled.div`
  & ul {
    display: flex;
    justify-content: flex-end;
    padding: 40px 30px 20px 0;
    & li {
      padding: 10px 20px;
      position: relative;
      color: ${props => props.theme.color.grey5};
      &:first-child {
        &::before {
          content: "";
          position: absolute;
          top: 15px;
          right: 0;
          width: 1px;
          height: 14px;
          background-color: ${props => props.theme.color.grey5};
        }
      }
    }
  }
`;

const SContentWrapper = styled.div`
  display: flex;
`;

const SLeftContainer = styled.div`
  width: 50%;
  height: 700px;
  position: sticky;
  top: 100px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-right: 50px;
`;

const SPreviewTitle = styled.div``;
const SPreviewContent = styled.div`
  flex: 1;
  min-width: 700px;
  background-color: ${props => props.theme.color.grey3};
`;

const SRightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SBloglist = styled.div`
  width: 342px;
  height: 253px;
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
  /* border-radius: 30px; */
  & .content1 {
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;
  }
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

const SPlus = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${blogplus});
  margin-top: 30px;
  width: 38px;
  height: 38px;
`;

const SUserInfo = styled.div`
  display: flex;
  padding-bottom: 20px;
  align-items: center;
`;
