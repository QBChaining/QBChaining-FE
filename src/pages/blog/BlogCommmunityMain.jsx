import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getBlogCommunityListDB } from "../../redux/async/blog";
import { useNavigate, useParams } from "react-router-dom";
const BlogCommmunityMain = () => {
  const blogList = useSelector(state => state.blogSlice.blogList);
  console.log("블로고", blogList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 요청한 데이터를 조회 하기 위해서
  React.useEffect(() => {
    dispatch(getBlogCommunityListDB());
  }, [dispatch]);

  return (
    <div>
      <SBody>
        <SListGroup>
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
          {blogList?.map(posts => {
            return (
              <SBloglist key={posts.id}>
                <div
                  onClick={() => {
                    navigate(`/blog/detail/${posts.id}`);
                  }}
                >
                  <p>{posts.title}</p>
                  <p>{posts.content}</p>
                  <p>{posts.user?.user_name}</p>
                </div>
                <div>
                  <p>{posts.tag}</p>
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
