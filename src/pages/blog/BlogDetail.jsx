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
// import BlogBookMark from "../../components/blog/BlogBookMark";
import { colorSetBlue } from "../../redux/modules/userSlice";
import BlogDetailBookMark from "../../components/blog/BlogDetailBookMark";
import Notification from "../../components/common/Notification";
const BlogCommunityDetail = () => {
  const response = useSelector(state => state.blogSlice.blogDetail);
  console.log("detail", response);
  const userNick = useSelector(state => state.userSlice.userName);
  console.log(userNick);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  //게시글 삭제

  const deleteBlogPost = () => {
    dispatch(deleteBlogCommunityDB(id));
  };
  useEffect(() => {
    dispatch(getBlogDetailDB(id));
    dispatch(colorSetBlue());
  }, []);

  return (
    <SContainer>
      {response?.map(detail => (
        <div key={detail.id}>
          <STitleSection>
            <div className="bookMark">
              <BlogDetailBookMark isbookmark={detail?.is_bookmark} />
              <STitle>{detail?.title}</STitle>
            </div>
            <SProfileNickNameDate>
              <SDate>
                <div className="name">{detail.user_name}</div>
                <div className="date">
                  {detail.created_at?.slice(0, 10)} /{" "}
                  {detail.created_at?.slice(11, 16)}
                </div>
              </SDate>
              <SProfile url={detail.profile_img} />
            </SProfileNickNameDate>
          </STitleSection>
          <SContentWrapper>
            {userNick === detail.user_name && (
              <ButtonGroup>
                <div
                  className="editbtn"
                  onClick={() => {
                    navigate(`/blog/edit/${id}`);
                  }}
                >
                  수정
                </div>
                <div>|</div>
                <div
                  className="delbtn"
                  onClick={id => {
                    navigate("/blog");
                    deleteBlogPost(id);
                  }}
                >
                  삭제
                </div>
              </ButtonGroup>
            )}
            <SContents>
              <Notification />
              <ToastViewer className="content1" content={detail.content} />
            </SContents>
            <SLikeNtags>
              <div className="tagList">
                {detail?.tag.map((tags, i) => (
                  <STag key={i}>
                    <div>{tags}</div>
                  </STag>
                ))}
              </div>
              <BlogLike love={detail.is_like} isbookmark={detail.is_bookmark} />
            </SLikeNtags>
          </SContentWrapper>
        </div>
      ))}
      <SCommentWrapper>
        <CommentAdd />
        <CommentList />
      </SCommentWrapper>
      <ModalBookmark isWrite={true} />
    </SContainer>
  );
};

export default BlogCommunityDetail;

const SContainer = styled.div`
  width: 1260px;
  margin: 0 auto;
  margin-top: 40px;
  padding-bottom: 20px;
`;
const SNickName = styled.div``;
const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
  gap: 6px;
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
  border-bottom: 1px solid #939393;
  padding: 30px;
  align-items: center;
  & .bookMark {
    display: flex;
    flex-direction: row;
  }
`;
const STitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  padding-left: 7px;
`;

const SProfileNickNameDate = styled.div`
  display: flex;
`;
const SDate = styled.div`
  margin-right: 10px;
  text-align: right;
  & .name {
    font-size: 18px;
  }
  & .date {
    font-size: 14px;
    color: #939393;
  }
`;

const SContents = styled.div`
  margin-top: 15px;
  min-height: 200px;
`;
const SLikeNtags = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .tagList {
    display: flex;
    padding-top: 40px;
  }
`;

const SProfile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.color.grey3};
  background-image: url(${props => props.url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 11px;
`;

const STag = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: ${props => props.theme.color.mainBlue};
  padding: 10px 15px;
  margin-right: 15px;
  border: 1px solid ${props => props.theme.color.mainBlue};
  border-radius: 30px;
  margin: 0 16px 20px 0;
`;

const SContentWrapper = styled.div`
  padding: 40px 40px 20px 40px;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
`;

const SCommentWrapper = styled.div`
  padding: 0 40px;
`;
