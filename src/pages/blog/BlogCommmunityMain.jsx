import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogCommunityListDB } from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToastViewer from "../../components/editor/ToastViewer";
import BlogBookMark from "../../components/blog/BlogBookMark";
import react from "../../assets/images/icon/react.png";
const BlogCommmunityMain = () => {
  const blogMainLists = useSelector(state => state.blogSlice.blogList);
  const blogMainTagList = useSelector(
    state => state.blogSlice.blogList.postTag,
  );
  console.log(blogMainLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(getBlogCommunityListDB());
  }, [dispatch]);

  return (
    <div>
      <STopBox>
        <SRecommend>selectsdfsdf</SRecommend>

        <STopHelper
          onClick={() => {
            navigate("/blog/write");
          }}
        >
          <div className="helpText">궁금한걸 물어보세요!</div>
          <div className="helpSubText">
            클릭하시면 블로그 작성페이지로 이동합니다.
          </div>
        </STopHelper>
      </STopBox>
      <SBody>
        <SListGroup>
          {blogMainLists?.map(posts => {
            return (
              <SBloglist data={posts} key={posts.id}>
                <SContentsGroup>
                  <div
                    onClick={() => {
                      navigate(`/blog/detail/${posts.id}`);
                    }}
                  >
                    <SPTitleBox>
                      <Sprofile />
                      <div className="title">{posts.title}</div>
                    </SPTitleBox>
                    <SContent>
                      <ToastViewer
                        className="content1"
                        content={posts.content}
                      />
                    </SContent>
                  </div>
                  <div>
                    <STag>{posts.tag}</STag>
                    {blogMainLists.map(tags => {
                      return <div key={tags.id}></div>;
                    })}
                  </div>
                  <div>
                    <BlogBookMark />
                  </div>
                </SContentsGroup>
              </SBloglist>
            );
          })}
        </SListGroup>
      </SBody>
    </div>
  );
};

const SBody = styled.div``;
const STopBox = styled.div`
  width: 100%;
  max-width: 1920px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #2776ed;
  padding: 35px 20px;
  j &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - 88px);
    transform: translateX(-50%);
    height: 1px;
    background-color: ${props => props.theme.color.white};
  }
`;
const SRecommend = styled.div`
  position: absolute;
  width: 1020px;
  height: 300px;

  background: #ffffff;

  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
`;
const STopHelper = styled.div`
  width: 100%;
  max-width: 420px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.color.white};
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 30px;
  cursor: pointer;
  & .helpText {
    font-size: 30px;
    font-weight: bold;
    margin-top: 95px;
  }
  & .helpSubText {
    font-size: 20px;
    font-weight: 100;
    margin-top: 5px;
  }
`;
const SListGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SBloglist = styled.div`
  width: 342px;
  height: 254px;
  background: #ffffff;
  margin: 36px 40px 36px 40px;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
`;

const SContent = styled.div`
  /* border-radius: 20px; */

  & .content1 {
    font-weight: 400;
    font-size: 18px;
    line-height: 25px;

    /* font-color: #9c9c9c; */
  }
`;
const STag = styled.div`
  border: 1px solid red;
`;
const SContentsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 20px;
`;

const SPTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  & .title {
    font-size: 20px;

    margin-left: 5px;
  }
`;
const Sprofile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${react});
  width: 20px;
  height: 20px;
`;

export default BlogCommmunityMain;

//태그 추가(블로그C할때 같이들어가야한다.), 코멘트CRUD,  페이지네이션(백앤드와소통)
