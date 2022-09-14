import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogCommunityListDB } from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToastViewer from "../../components/editor/ToastViewer";
import BlogBookMark from "../../components/blog/BlogBookMark";
import react from "../../assets/images/icon/react.png";
import BlogHotList from "../../components/blog/BlogHotList";
import blogplus from "../../assets/images/blogplus.png";
import ModalBookmark from "../../components/common/ModalBookmark";
import { colorSetBlue } from "../../redux/modules/userSlice";
const BlogCommmunityMain = () => {
  const blogMainLists = useSelector(state => state.blogSlice.blogList);
  console.log("블로그전체", blogMainLists);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(getBlogCommunityListDB());
    dispatch(colorSetBlue());
  }, [dispatch]);
  //머지
  return (
    <div>
      {/* <SLine /> */}
      <STopBox>
        <SRecommend>
          <BlogHotList />
        </SRecommend>

        <STopHelper
          onClick={() => {
            navigate("/blog/write");
          }}
        >
          <div className="helpText">게시글을 작성해 보세요!</div>
          <div className="helpSubText">
            클릭하시면 블로그 작성페이지로 이동합니다.
          </div>
          <SPlus />
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
                      {/* {posts.content} */}
                      <ToastViewer
                        className="content1"
                        content={posts.content}
                      />
                    </SContent>
                  </div>
                  <STagNMark>
                    <STagList>
                      {posts.tag?.map(tags => {
                        return (
                          <div key={tags.id}>
                            <STag>{tags}</STag>
                          </div>
                        );
                      })}
                    </STagList>
                    <SBookMark>
                      <BlogBookMark isbookmark={posts.is_bookmark} />
                    </SBookMark>
                  </STagNMark>
                </SContentsGroup>
              </SBloglist>
            );
          })}
        </SListGroup>
      </SBody>
      <ModalBookmark />
    </div>
  );
};
//전체
const SBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: left;
`;
//탑박스
const STopBox = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #2676ed;
  padding: 61px 61px;
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
const SRecommend = styled.div`
  min-width: 1020px;
  height: 300px;

  background: #ffffff;

  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
`;
const STopHelper = styled.div`
  width: 100%;
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
  flex-wrap: wrap;
  /* align-items: center; */
  justify-content: center;
  min-width: 1492px;
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

    /* font-color: #9c9c9c; */
  }
`;
const STagList = styled.div`
  display: flex;
  flex-direction: row;
`;
const STag = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
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
  margin-top: 20px;
`;

const SContentsGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin: 36px 28px 30px 28px;
`;

const SPTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  & .title {
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 20px;
  }
`;
const Sprofile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${react});
  width: 20px;
  height: 20px;
`;
const SPlus = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${blogplus});
  margin-top: 30px;
  width: 38px;
  height: 38px;
`;

const STagNMark = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 300px;
  height: 100px;
`;

export default BlogCommmunityMain;

//태그 추가(블로그C할때 같이들어가야한다.), 코멘트CRUD,  페이지네이션(백앤드와소통)
