import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getBlogCommunityListDB } from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import ToastViewer from "../../components/editor/ToastViewer";

const BlogCommmunityMain = () => {
  const blogMainLists = useSelector(state => state.blogSlice.blogList);
  console.log("메인블로그", blogMainLists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //메인 블로그 게시글 조회
  useEffect(() => {
    dispatch(getBlogCommunityListDB());
  }, [dispatch]);

  return (
    <div>
      <SBody>
        <SListGroup>
          <div
            style={{
              fillOpacity: "0.3",
              width: "100%",
              textAlign: "center",
              borderBottom: "1px solid #aaa",
              lineHeight: "0.1em",
              margin: "100px 0 20px",
            }}
          ></div>

          <STopBox>
            <STopList>최근의 추천 많이 받은 게시글</STopList>
            <br />
            리스트나중에
          </STopBox>
          <div>
            <button
              onClick={() => {
                navigate("/blog/write");
              }}
            >
              글쓰기
            </button>
          </div>
          {blogMainLists?.map(posts => {
            return (
              <SBloglist data={posts} key={posts.id}>
                <div
                  onClick={() => {
                    navigate(`/blog/detail/${posts.id}`);
                  }}
                >
                  <div>TITLE :: {posts.title}</div>
                  <hr />
                  <ToastViewer content={posts.content} />
                  <div>NICKNAME :: {posts.user?.user_name}</div>
                  <div>❤️{posts?.like}</div>
                  <div>💬{posts?.cmtNum}</div>
                  <div>CREATED_DATE :: {posts?.created_at}</div>
                </div>
                <div>
                  <p>TAGS :: {posts?.tag}</p>
                </div>
              </SBloglist>
            );
          })}
        </SListGroup>
      </SBody>
    </div>
  );
};

const SBody = styled.div`
  display: flex;
  flex-direction: row;
`;
const SListGroup = styled.div``;
const SBloglist = styled.div`
  border: 1px solid black;
`;
const STopList = styled.div``;
const STopBox = styled.div`
  border: 1px solid black;
`;
export default BlogCommmunityMain;

//태그 추가(블로그C할때 같이들어가야한다.), 코멘트CRUD,  페이지네이션(백앤드와소통)
