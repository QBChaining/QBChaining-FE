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
import { Helmet } from "react-helmet-async";
import { confirmAlert, infoAlert, successAlert } from "./../../utils/swal";

const BlogCommunityDetail = () => {
  const { blogDetail: detail } = useSelector(state => state.blogSlice);
  const detailTitle = useSelector(state => state.blogSlice.blogDetail.title);
  const userName = useSelector(state => state.blogSlice.blogDetail.userName);
  const profileImg = useSelector(
    state => state.blogSlice.blogDetail.profileImg,
  );
  const isBookmark = useSelector(
    state => state.blogSlice.blogDetail.isBookmark,
  );
  const userNick = useSelector(state => state.userSlice.userName);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //게시글 삭제

  const deleteBlogPost = () => {
    confirmAlert("삭제", "이 게시글을 삭제하시겠습니까?", "삭제", "취소").then(
      res => {
        res.isConfirmed === true
          ? dispatch(deleteBlogCommunityDB(id)).then(() => {
              successAlert("삭제되었습니다!").then(res => {
                (res.isConfirmed || res.isDismissed) && navigate("/blog");
              });
            })
          : infoAlert("취소되었습니다!");
      },
    );
  };

  useEffect(() => {
    dispatch(getBlogDetailDB(id));
    dispatch(colorSetBlue());
  }, [id]);

  const goMypage = name => {
    navigate(`/mypage/${name}`);
  };

  return (
    <SContainer>
      <Helmet>
        <title>Blog Detail</title>
      </Helmet>
      <div key={detail.id}>
        <STitleSection>
          <div className="bookMark">
            <BlogDetailBookMark
              isdetailbookmark={true}
              target={detail}
              isbookmark={isBookmark}
            />
            <STitle>{detailTitle}</STitle>
          </div>
          <SProfileNickNameDate
            onClick={() => {
              goMypage(userName);
            }}
          >
            <SDate>
              <div className="name">{userName}</div>
              <div className="date">
                {detail.createdAt?.slice(0, 10)} /{" "}
                {detail.createdAt?.slice(11, 16)}
              </div>
            </SDate>
            <SProfile url={detail.profileImg} />
          </SProfileNickNameDate>
        </STitleSection>
        <SContentWrapper>
          {userNick === detail.userName && (
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
                  deleteBlogPost(id);
                }}
              >
                삭제
              </div>
            </ButtonGroup>
          )}
          <SContents>
            <ToastViewer className="content1" content={detail.content} />
          </SContents>
          <SLikeNtags>
            <TagList>
              {detail.tags?.map((tags, i) => (
                <STag key={i}>
                  <div>{tags}</div>
                </STag>
              ))}
            </TagList>
            <BlogLike
              isLike={detail.isLike}
              like={detail.like}
              isbookmark={detail.isBookmark}
            />
          </SLikeNtags>
        </SContentWrapper>
      </div>
      <SCommentWrapper>
        <CommentAdd />
        <CommentList />
      </SCommentWrapper>
    </SContainer>
  );
};
export default BlogCommunityDetail;

const SContainer = styled.div`
  width: 1660px;
  margin: auto;
  margin-top: 40px;
  padding: 0 200px;
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
  align-items: center;
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
  cursor: pointer;
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
`;
const TagList = styled.div`
  display: flex;
  margin-top: 20px;
`;
const SProfile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
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
  color: ${props => props.theme.color.mainOrange};
  padding: 10px 15px;
  margin-right: 15px;
  border: 1px solid ${props => props.theme.color.mainOrange};
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
