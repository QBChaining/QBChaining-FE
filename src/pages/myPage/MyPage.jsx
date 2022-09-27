import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getUserBlogListDB,
  getUserInfoActivityDB,
  getUserQnaListDB,
} from "../../redux/async/user";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfoDB } from "./../../redux/async/user";
import MyPageActivity from "../../components/myPage/MyPageActivity";
import MyPageSolveIcon from "../../assets/images/MyPageSolveIcon.png";
import MyPageUnSolveIcon from "../../assets/images/MyPageUnSolveIcon.png";
import unlike from "../../assets/images/unlike.png";
import { nanoid } from "@reduxjs/toolkit";
const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userName } = useParams();

  const {
    isLogin,
    isFetching,
    userInfo,
    userName: loginUserName,
    userQnaList,
    userQnaAnswerList,
    userBlogList,
    userBlogCommentList,
  } = useSelector(state => state.userSlice);

  useEffect(() => {
    dispatch(getUserInfoActivityDB(userName));
    dispatch(getUserInfoDB(userName));
    dispatch(getUserQnaListDB(userName));
    dispatch(getUserBlogListDB(userName));
  }, [userName]);

  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };

  console.log(isFetching);

  if (isFetching) {
    return <div>로딩중</div>;
  } else {
    return (
      <SMyPage>
        <SUserInfoWrapper>
          <SUserInfoInner>
            <SUserProfile profileImg={userInfo?.profileImg}></SUserProfile>
            <SUserInfo>
              <SUserName>
                {userInfo?.name}
                {loginUserName === userName && (
                  <button
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    정보 수정
                  </button>
                )}
              </SUserName>
              {loginUserName === userName && (
                <SUserDetail>
                  <li>{userInfo?.gender}</li>
                  <li>{userInfo?.age}</li>
                  <li>{userInfo?.career}</li>
                  <li>{userInfo?.job}</li>
                </SUserDetail>
              )}
            </SUserInfo>
          </SUserInfoInner>
          <SCube>
            <MyPageActivity />
          </SCube>
        </SUserInfoWrapper>
        <SListWrapper>
          <SList>
            <SQna>
              <STitle>Q&A</STitle>
              <SListContainer>
                <SHeader type={"qna"}>MY 질문</SHeader>
                <SMain>
                  {userQnaList.map(data => (
                    <SListInner
                      key={data.id}
                      onClick={() => {
                        goDetail("qna", data.id);
                      }}
                    >
                      <SListTitleWrapper>
                        <SListTitle>{data.title}</SListTitle>
                        <SListDate>{data.createdAt.slice(0, 10)}</SListDate>
                      </SListTitleWrapper>
                      <SSolveText resolve={data.isResolve}>
                        <SSolveIcon resolve={data.isResolve} />
                        {data.isResolve ? "채택완료" : "채택미완료"}
                      </SSolveText>
                    </SListInner>
                  ))}
                </SMain>
              </SListContainer>
              <SListContainer>
                <SHeader type={"qna"}>MY 답변</SHeader>
                <SMain>
                  {userQnaAnswerList.map(comment => (
                    <SListInner
                      key={comment.id}
                      onClick={() => {
                        goDetail("qna", comment.Qna.id);
                      }}
                    >
                      <SListTitleWrapper>
                        <SListTitle>{comment.Qna.title}</SListTitle>
                        <SListDate>
                          {comment.Qna.createdAt.slice(0, 10)}
                        </SListDate>
                      </SListTitleWrapper>
                      <SSolveText resolve={comment.Qna.isResolve}>
                        <SSolveIcon resolve={comment.Qna.isResolve} />
                        {comment.Qna.isResolve ? "채택완료" : "채택미완료"}
                      </SSolveText>
                    </SListInner>
                  ))}
                </SMain>
              </SListContainer>
            </SQna>
            <SBlog>
              <STitle>BLOG</STitle>
              <SListContainer>
                <SHeader type={"blog"}>MY 게시글</SHeader>
                <SMain>
                  {userBlogList.map(data => (
                    <SListInner
                      key={data.id}
                      onClick={() => {
                        goDetail("blog", data.id);
                      }}
                    >
                      <SListTitleWrapper>
                        <SListTitle>{data.title}</SListTitle>
                        <SListDate>{data.createdAt.slice(0, 10)}</SListDate>
                      </SListTitleWrapper>
                      <SSolveText>
                        <SLikeIcon />
                        {data.like}
                      </SSolveText>
                    </SListInner>
                  ))}
                </SMain>
              </SListContainer>
              <SListContainer>
                <SHeader type={"blog"}>MY 댓글</SHeader>
                <SMain>
                  {userBlogCommentList.map(data => (
                    <SListInner
                      key={nanoid()}
                      onClick={() => {
                        goDetail("blog", data.Post.id);
                      }}
                    >
                      <SListTitleWrapper>
                        <SListTitle>{data.Post.title}</SListTitle>
                        <SListDate>
                          {data.Post.createdAt.slice(0, 10)}
                        </SListDate>
                      </SListTitleWrapper>
                      <SSolveText>
                        <SLikeIcon />
                        {data.Post.like}
                      </SSolveText>
                    </SListInner>
                  ))}
                </SMain>
              </SListContainer>
            </SBlog>
          </SList>
        </SListWrapper>
      </SMyPage>
    );
  }
};

export default MyPage;

const SMyPage = styled.div`
  position: relative;
  width: 1920px;
  margin: 45px auto 0;
  padding: 0 200px 50px;
`;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 140px;
`;

const SUserProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 35px;
  background-image: url(${props => props.profileImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
const SUserInfo = styled.div``;
const SUserName = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 20px;

  & button {
    border: none;
    background-color: ${props => props.theme.color.mainNavy};
    color: ${props => props.theme.color.white};
    padding: 5px 20px;
  }
`;

const SUserDetail = styled.div`
  display: flex;

  & li {
    margin-right: 10px;
    border-radius: 30px;
    border: 1px solid black;
    padding: 2px 10px;
  }
`;

const SListWrapper = styled.div``;
const SList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SListContainer = styled.div`
  width: 310px;
  height: 500px;
  margin-right: 30px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
`;
const SQna = styled.div`
  display: flex;
  position: relative;
`;
const SBlog = styled.div`
  display: flex;
  position: relative;
`;

const SHeader = styled.div`
  background-color: ${props => props.theme.color.mainOrange};
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.theme.color.white};
`;

const SMain = styled.ul`
  padding: 20px;
  overflow: auto;
  height: 100%;
  background-color: ${props => props.theme.color.white};
`;

const SListDate = styled.div`
  font-size: 12px;
  color: ${props => props.theme.color.grey5};
  transition: 0.3s;
`;

const SListInner = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid ${props => props.theme.color.grey3};
  cursor: pointer;
  &:last-child {
    border-bottom: none;
    padding-bottom: 50px;
  }

  &:hover ${SListDate} {
    color: ${props => props.theme.color.black};
  }
`;

const SListTitleWrapper = styled.div``;
const SListTitle = styled.div`
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SCube = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 160px;
`;

const STitle = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 50px;
  font-weight: 900;
  position: absolute;
  top: -70px;
  left: 0;
  color: ${props => props.theme.color.mainNavy};
`;

const SUserInfoInner = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const SSolveText = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  color: ${props => (props.resolve ? "#1e1e1e" : "#c0c0c0")};
`;
const SSolveIcon = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 4px;
  background-image: url(${props =>
    props.resolve ? MyPageSolveIcon : MyPageUnSolveIcon});
`;

const SLikeIcon = styled.div`
  width: 14px;
  height: 12px;
  margin-right: 4px;
  background-image: url(${unlike});
  background-size: cover;
`;
