import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BlogBookMark from "./BlogBookMark";
import unlike from "../../assets/images/GreyQnaLike.png";
import cmtComment from "../../assets/images/GreyQnaComment.png";
import { getToday } from "./../../utils/today";
const BlogMainList = ({ posts }) => {
  const [Like, setLike] = useState(posts.isLove);
  console.log("하트블린", posts.isLove);
  useEffect(() => {
    if (posts.isLove) {
      setLike(true);
    }
    if (!posts.isLove) {
      setLike(false);
    }
  }, [posts.isLove]);
  const navigate = useNavigate();
  console.log(posts);

  //몇일전 구하는 함수
  const timeForToday = value => {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60,
    );
    if (betweenTime < 1) return "방금전";
    if (betweenTime < 60) {
      return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
      return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
  };

  const time = timeForToday(posts.createdAt);

  return (
    <>
      <SBloglist
        onClick={() => {
          navigate(`/blog/detail/${posts.id}`);
        }}
      >
        <SContentsGroup>
          <SPTitleBox>
            <SUserInfo>
              <SProfile url={posts.profileImg} />
              <SUserName>{posts.userName}</SUserName>
              <SCreatedAt>{time}</SCreatedAt>
            </SUserInfo>
            <SBookMark>
              <BlogBookMark
                ismainlist={true}
                isbookmark={posts.isBookmark}
                posts={posts}
              />
            </SBookMark>
          </SPTitleBox>
          <SContentWrapper>
            <SContentTitle className="title">{posts.title}</SContentTitle>
            <SContent>{posts.content}</SContent>
          </SContentWrapper>
          <STagNMark>
            <STagList>
              {posts.tags?.map((tags, i) => (
                <STag key={i}>{tags}</STag>
              ))}
            </STagList>
            <SIconContainer>
              <SLike>{posts.like}</SLike>
              <SComment>{posts.cntComment}</SComment>
            </SIconContainer>
          </STagNMark>
        </SContentsGroup>
      </SBloglist>
      {/* </BlogHover> */}
    </>
  );
};

export default BlogMainList;

const SBloglist = styled.div`
  position: relative;
  /* width: 100%; */
  width: 480px;
  min-height: 350px;
  /* height: 100%; */
  background: #ffffff;
  border-radius: 30px;
  padding: 30px 40px;
  margin-right: 60px;
  margin-bottom: 40px;
  transition: 0.5s;
  cursor: pointer;
  &:nth-child(2n + 1) {
    margin-right: 0;
  }
  &:hover {
    box-shadow: #fce3cd -10px 10px 0px 0px;
  }
`;

const SPTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid ${props => props.theme.color.mainNavy};
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

const STagList = styled.div`
  /* background-color: orange; */
  align-items: center;
  display: flex;
  padding-right: 130px;
`;
const STag = styled.div`
  background-color: orange;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  /* margin-right: 15px; */
  padding: 5px 20px;
  background: ${props => props.theme.color.mainNavy};
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
  position: relative;
`;

const SComment = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${props => props.theme.color.grey5};
  padding-right: 25px;
  background-image: url(${cmtComment});
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 18px 16px;
`;

const SLike = styled.div`
  /* background-color: orange; */

  display: flex;
  align-items: flex-end;
  color: ${props => props.theme.color.grey5};
  padding-right: 20px;
  background-image: url(${unlike});
  background-position: right center;
  background-repeat: no-repeat;
  background-size: 16px 14px;
`;

const SContentWrapper = styled.div``;

const SUserName = styled.div`
  font-size: 20px;
  margin-right: 10px;
`;

const SCreatedAt = styled.div`
  font-size: 15px;
  color: #1e1e1e;
`;

const SContentTitle = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-top: 10px;
`;

const SContent = styled.div`
  min-height: 120px;
  overflow: hidden;
  margin-top: 20px;
`;

const SIconContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 0;
  display: flex;
  gap: 25px;
`;
