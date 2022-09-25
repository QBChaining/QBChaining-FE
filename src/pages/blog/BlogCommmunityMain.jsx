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
import mainpage from "../../assets/images/mainpage.png";
import { Helmet } from "react-helmet-async";
import SideBanner from "./../../components/common/SideBanner";
import QnaWriteIcon from "../../assets/images/QnaWriteIcon.png";
// import BlogHover from "../../components/blog/BlogHover";
const BlogCommmunityMain = () => {
  const blogMainLists = useSelector(state => state.blogSlice.blogList);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(getBlogCommunityListDB());
    dispatch(colorSetBlue());
  }, []);

  console.log(blogMainLists);

  return (
    <SBlogCommmunityMain>
      <Helmet>
        <title>Blog Main</title>
      </Helmet>
      {/* <STopBox>
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
      </STopBox> */}
      <SBody>
        <STitle>BLOG</STitle>
        <SContentWrapper>
          <SLeftContainer>
            <SWritingButtonWrapper
              onClick={() => {
                navigate("/blog/write");
              }}
            >
              <SWritingButton>
                <div></div>작성하기
              </SWritingButton>
            </SWritingButtonWrapper>
            {blogMainLists?.map(posts => (
              <BlogMainList posts={posts} key={posts.id} />
            ))}
          </SLeftContainer>
          <SideBanner type={"blog"} />
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

const SBody = styled.div`
  width: 1920px;
  padding: 0 200px;
  margin: 0 auto;
`;

const SContentWrapper = styled.div`
  display: flex;
  position: relative;
`;

const SLeftContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  position: relative;
  margin-right: 90px;
`;

const SPreviewTitle = styled.div`
  font-size: 20px;
`;
const SPreviewContent = styled.div`
  flex: 1;
  min-width: 700px;
  /* background-color: ${props => props.theme.color.grey3}; */

  /* background-position: center;
  background-size: cover;
  background-image: url(${mainpage}); */
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
  background-repeat: no-repeat;
  margin-right: 11px;

  background-position: center;
  background-size: cover;
  background-image: url(${mainpage});
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

const STitle = styled.h2`
  font-weight: 900;
  font-family: "Inter", sans-serif;
  font-size: 70px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const SWritingButtonWrapper = styled.div`
  position: absolute;
  top: -70px;
  right: 0;
  cursor: pointer;
  width: 130px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SWritingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.mainOrange};
  & div {
    width: 20px;
    height: 20px;
    background-image: url(${QnaWriteIcon});
    background-size: contain;
    margin-right: 10px;
  }
`;
