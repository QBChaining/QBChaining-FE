import React, { useEffect } from "react";
import styled from "styled-components";
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
import { useParams } from "react-router-dom";
import { deleteBlogCommunityDB } from "../../redux/async/blog";
import ModalBookmark from "../../components/common/ModalBookmark";
import ToastViewer from "./../../components/editor/ToastViewer";
import BlogLike from "../../components/blog/BlogLike";
import BlogBookMark from "../../components/blog/BlogBookMark";
import profiletest from "../../assets/images/profiletest.png";

const BlogCommunityDetail = () => {
  const response = useSelector(state => state.blogSlice.blogDetail);
  console.log("detail", response);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  //게시글 삭제

  const deleteBlogPost = () => {
    dispatch(deleteBlogCommunityDB(id));
  };
  useEffect(() => {
    dispatch(getBlogDetailDB(id));
  }, []);

  return (
    <SContainer>
      {response?.map(detail => {
        return (
          <div isLike={response.is_like} key={detail.id}>
            <STitleSection>
              <div className="bookMark">
                <BlogBookMark />
                <STitle>{detail.title}</STitle>
              </div>
              <SProfileNickNameDate>
                <SDate>
                  <div className="name">{detail.user_name?.user_name}</div>
                  <div className="date">
                    {detail.created_at?.slice(0, 10)} /{" "}
                    {detail.created_at?.slice(11, 16)}
                  </div>
                </SDate>
                <Sprofile />
              </SProfileNickNameDate>
            </STitleSection>
            <ButtonGroup>
              <div
                className="editbtn"
                type="button"
                onClick={() => {
                  navigate(`/blog/edit/${id}`);
                }}
              >
                수정
              </div>
              <div>|</div>
              <div
                className="delbtn"
                type="button"
                onClick={id => {
                  navigate("/blog");
                  deleteBlogPost(id);
                }}
              >
                삭제
              </div>
            </ButtonGroup>
            <SContents>
              <ToastViewer className="content1" content={detail.content} />
            </SContents>
            <SLikeNtags>
              <div className="tagList">
                {detail.tag.map(tags => {
                  return (
                    <STag>
                      <div>{tags}</div>
                    </STag>
                  );
                })}
              </div>
              <BlogLike
                islike={detail.is_like}
                isbookmark={detail.is_bookmark}
              />
            </SLikeNtags>
          </div>
        );
      })}

      <div>
        <CommentAdd />
        <CommentList />
      </div>
      <ModalBookmark isWrite={true} />
    </SContainer>
  );
};
const SContainer = styled.form`
  max-width: 1220px;
`;
const SNickName = styled.div``;
const ButtonGroup = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin: 20px 40px 0px 0px;
  font-size: 16px;
  color: #7a7a7a;
  & .editbtn {
    cursor: pointer;
  }
  & .delbtn {
    cursor: pointer;
  }
`;
const STitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1220px;
  border-bottom: 1px solid #939393;
  & .bookMark {
    display: flex;
    flex-direction: row;
  }
`;
const STitle = styled.div`
  font-size: 24px;
  font-weight: 600;
`;

const SProfileNickNameDate = styled.div`
  display: flex;
`;
const SDate = styled.div`
  & .name {
    font-size: 18px;
    margin-left: 50px;
  }
  & .date {
    font-size: 14px;
    color: #939393;
  }
`;

const Sprofile = styled.div`
  background-position: center;
  background-size: cover;
  background-image: url(${profiletest});
  margin-left: 14px;
  width: 44px;
  height: 44px;
`;

const SContents = styled.div`
  margin: 20px 0px 0px 40px;
`;
const SLikeNtags = styled.div`
  & .tagList {
    display: flex;
    flex-direction: row;
  }
`;

const STag = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #2776ed;
  width: 108px;
  height: 39px;
  margin-right: 15px;
  border: 1px solid #2776ed;
  border-radius: 30px;
  margin: 40px 16px 20.2px 0px;
`;

export default BlogCommunityDetail;
