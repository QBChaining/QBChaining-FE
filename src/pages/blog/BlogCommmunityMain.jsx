import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import _ from "lodash";

//컴포넌트
import ModalBookmark from "../../components/common/ModalBookmark";
import BlogMainList from "../../components/blog/BlogMainList";
import SideBanner from "./../../components/common/SideBanner";

//통신
import { getBlogCommunityListDB } from "../../redux/async/blog";
import { removeBlogList } from "../../redux/modules/blogSlice";
import { colorSetBlue } from "../../redux/modules/userSlice";

//이미지
import MainWriteButton from "../../assets/images/MainWriteButton.png";

const BlogCommmunityMain = () => {
  const blogMainList = useSelector(state => state.blogSlice.blogList);
  const isFinish = useSelector(state => state.blogSlice.isMore);
  const blogMainLists = [...new Set(blogMainList.map(JSON.stringify))].map(
    JSON.parse,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * 처음 보여줄 페이지 카운트
   */
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  /**
   * 처음 게시물 불러오기 비동기요청
   */
  const getBlogMainCoumunity = useCallback(() => {
    const finish = async () => {
      if (isFinish >= 1) {
        await dispatch(getBlogCommunityListDB(page));
        setLoading(false);
      }
    };
    return finish();
  }, [page, blogMainLists]);

  /**
   * 스크롤 위치 계산
   */
  const _scrollPosition = _.throttle(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
      setPage(page => page + 1);
      getBlogMainCoumunity();
      setLoading(true);
    }
  }, 500);

  /**
   * 페이지 계산 get요청 page 카운트 올리기
   */
  useEffect(() => {
    if (page === 0) {
      dispatch(getBlogCommunityListDB(page));
      setPage(page => page + 1);
    }

    if (isFinish === 0) {
    }
  }, [page]);

  useEffect(() => {
    if (loading) {
      return;
    }
    window.addEventListener("scroll", _scrollPosition);
    return () => {
      window.removeEventListener("scroll", _scrollPosition);
    };
  }, [page, loading, isFinish]);

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(colorSetBlue());
    return () => {
      dispatch(removeBlogList());
    };
  }, []);

  return (
    <SBlogCommmunityMain>
      sdfsdfsdf
      <Helmet>
        <title>Blog Main</title>
      </Helmet>
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
    // {hasMore ? (isLoading ? null : <div ref={ref} style={{ border: "1px solid white" }}></div>)
    //  : <HashMore txt={'맨 하단 페이지 입니다.'} />}
  );
};

export default BlogCommmunityMain;

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
  min-width: 1300px;
  padding: 0 100px 0 200px;
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
`;

const STitle = styled.h2`
  font-weight: 900;
  font-family: "Inter", sans-serif;
  font-size: 70px;
  margin-top: 30px;
  margin-bottom: 60px;
  color: ${props => props.theme.color.mainNavy};
`;

const SWritingButtonWrapper = styled.div`
  position: absolute;
  top: -60px;
  right: 60px;
  cursor: pointer;
  width: 94px;
  height: 32px;
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
  font-weight: 600;
  border: none;
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.mainOrange};
  & div {
    width: 16px;
    height: 16px;
    background-image: url(${MainWriteButton});
    background-size: contain;
    margin-right: 10px;
  }
`;
