import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getUserInfoActivityDB } from "../../redux/async/user";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUserInfoActivityDB());
  }, []);

  const week1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const week2 = [
    [11, 12, 13],
    [14, 15, 16],
    [17, 18, 19],
  ];

  const week3 = [
    [21, 22, 23],
    [24, 25, 26],
    [27, 28, 29],
  ];

  return (
    <SMyPage>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        레지스터로 가기
      </button>
      <SUserInfoWrapper>
        <SUserProfile>유저프로필</SUserProfile>
        <SUserInfo>
          <SUserName>유저이름</SUserName>
          <SUserDetail>
            <li>여자</li>
            <li>10대초반</li>
            <li>포지션</li>
            <li>경력</li>
          </SUserDetail>
        </SUserInfo>
      </SUserInfoWrapper>
      <SListWrapper>
        <SList>
          <SQna>
            <SListContainer>
              <SHeader type={"qna"}>MY 질문</SHeader>
              <SMain>
                <SListInner>
                  <SListTitleWrapper>
                    <SListTitle>이것은 제목입니다</SListTitle>
                    <SListDate>2022.09.10</SListDate>
                  </SListTitleWrapper>
                  <div>채택완료</div>
                </SListInner>
              </SMain>
            </SListContainer>
            <SListContainer>
              <SHeader type={"qna"}>MY 답변</SHeader>
              <SMain>
                <SListInner>
                  <SListTitleWrapper>
                    <SListTitle>이것은 제목입니다</SListTitle>
                    <SListDate>2022.09.10</SListDate>
                  </SListTitleWrapper>
                  <div>채택완료</div>
                </SListInner>
              </SMain>
            </SListContainer>
          </SQna>
          <SBlog>
            <SListContainer>
              <SHeader type={"blog"}>MY 게시글</SHeader>
              <SMain>
                <SListInner>
                  <SListTitleWrapper>
                    <SListTitle>이것은 제목입니다</SListTitle>
                    <SListDate>2022.09.10</SListDate>
                  </SListTitleWrapper>
                  <div>채택완료</div>
                </SListInner>
              </SMain>
            </SListContainer>
            <SListContainer>
              <SHeader type={"blog"}>MY 댓글</SHeader>
              <SMain>
                <SListInner>
                  <SListTitleWrapper>
                    <SListTitle>이것은 제목입니다</SListTitle>
                    <SListDate>2022.09.10</SListDate>
                  </SListTitleWrapper>
                  <div>채택완료</div>
                </SListInner>
              </SMain>
            </SListContainer>
          </SBlog>
        </SList>
      </SListWrapper>
      <SCube>
        <SCubeWrapper>
          {week1.map((data, i) => (
            <div key={i}>
              {data.map((data2, i) => (
                <div key={i}></div>
              ))}
            </div>
          ))}
        </SCubeWrapper>
        <SCubeWrapper>
          {week2.map((data, i) => (
            <div key={i}>
              {" "}
              {data.map((data2, i) => (
                <div key={i}></div>
              ))}
            </div>
          ))}
        </SCubeWrapper>
        <SCubeWrapper>
          {week3.map((data, i) => (
            <div key={i}>
              {" "}
              {data.map((data2, i) => (
                <div key={i}></div>
              ))}
            </div>
          ))}
        </SCubeWrapper>
      </SCube>
    </SMyPage>
  );
};

export default MyPage;

const SMyPage = styled.div`
  position: relative;
  max-width: 1560px;
  margin: 150px auto 0;
  padding: 0 20px 100px;
`;

const SUserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

const SUserProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 35px;
`;
const SUserInfo = styled.div``;
const SUserName = styled.div`
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 10px;
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
`;
const SBlog = styled.div`
  display: flex;
`;

const SHeader = styled.div`
  background-color: ${props =>
    props.type === "qna"
      ? props.theme.color.mainGreen
      : props.theme.color.mainBlue};
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
`;

const SListInner = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme.color.grey3};

  &:last-child {
    border-bottom: none;
  }
`;

const SListTitleWrapper = styled.div``;
const SListTitle = styled.div``;
const SListDate = styled.div`
  font-size: 12px;
  color: ${props => props.theme.color.grey5};
`;

const SCube = styled.div`
  position: absolute;
  top: 0;
  right: 200px;
  display: flex;
`;
const SCubeWrapper = styled.div`
  display: flex;
  position: relative;
  transition: 2s;

  & > div > div {
    width: 30px;
    height: 30px;
    margin: 3px;
    background-color: ${props => props.theme.color.mainGreen};
  }
  /* 
  &:first-child {
    transform: rotate(120deg) skew(0deg, -30deg);
  }

  &:nth-child(2) {
    transform: rotate(-120deg) skew(0deg, 30deg);
  }

  &:nth-child(3) {
    position: absolute;
    top: -90px;
    left: 55px;
    transform: rotate(60deg) skew(0deg, -30deg);
  }
   */
  /* 
  &:first-child > div > div {
    background-color: red;
  }

  &:nth-child(2) > div > div {
    background-color: blue;
  }

  &:nth-child(3) > div > div {
    background-color: black;
  } */
`;
