import React, { useEffect } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "redux/config/configStore";

//컴포넌트
import CommentAdd from "../../components/blog/comment/BlogCommentAdd";
import CommentList from "../../components/blog/comment/BlogCommentList";
import ToastViewer from "../../components/editor/ToastViewer";
import BlogLike from "../../components/blog/BlogLike";
import BlogDetailBookMark from "../../components/blog/BlogDetailBookMark";
//통신
import { deleteBlogCommunityDB } from "../../redux/async/blog";
import { getBlogDetailDB } from "../../redux/async/blog";
//알럿
import {
  confirmAlert,
  errorAlert,
  infoAlert,
  successAlert,
} from "../../utils/swal";
import { removeErrorMessage } from "../../redux/modules/blogSlice";
import { ClipLoader } from "react-spinners";

const BlogCommunityDetail = () => {
  const {
    blogDetail: detail,
    detailErrorMessage,
    isDetailFetcing,
  } = useSelector((state: RootState) => state.blogSlice);
  const detailTitle = useSelector(
    (state: RootState) => state.blogSlice.blogDetail.title,
  );
  const userName = useSelector(
    (state: RootState) => state.blogSlice.blogDetail.userName,
  );
  const profileImg = useSelector(
    (state: RootState) => state.blogSlice.blogDetail.profileImg,
  );
  const isBookmark = useSelector(
    (state: RootState) => state.blogSlice.blogDetail.isBookmark,
  );
  const userNick = useSelector((state: RootState) => state.userSlice.userName);

  const dispatch: AppDispatch = useDispatch();
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
    if (detailErrorMessage === "존재하지 않는 게시물입니다") {
      errorAlert("삭제되었거나 존재하지 않는 게시물입니다.", "");
      return navigate("/blog", { replace: true });
    }
  }, [detailErrorMessage]);

  useEffect(() => {
    dispatch(getBlogDetailDB(id));
  }, []);

  const goMypage = (name: string) => {
    navigate(`/mypage/${name}`);
  };

  useEffect(() => {
    return () => {
      dispatch(removeErrorMessage());
    };
  }, []);

  if (isDetailFetcing) {
    return (
      <SLoading>
        <ClipLoader />
      </SLoading>
    );
  }

  return (
    <SContainer>
      <Helmet>
        <title>Blog Detail</title>
      </Helmet>
      <div key={detail.id}>
        <STitleSection>
          <div className="bookMark">
            <BlogDetailBookMark target={detail} isbookmark={isBookmark} />
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
              <div className="delbtn" onClick={deleteBlogPost}>
                삭제
              </div>
            </ButtonGroup>
          )}
          <SContents>
            <ToastViewer content={detail.content} />
          </SContents>
          <SLikeNtags>
            <TagList>
              {detail.tags?.map((tag: string, i: number) => (
                <STag key={i}>
                  <div>{tag}</div>
                </STag>
              ))}
            </TagList>
            <BlogLike isLike={detail.isLike} like={detail.like} />
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
  width: 1300px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 0 130px;
  padding-bottom: 20px;
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 40px;
  display: flex;
  gap: 6px;
  font-size: 16px;
  color: #7a7a7a;

  & div:hover {
    color: ${props => props.theme.color.mainNavy};
  }
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
  word-break: break-all;
`;

const SProfileNickNameDate = styled.div`
  display: flex;
  cursor: pointer;
  min-width: 200px;
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
const SProfile = styled.div<{ url: string }>`
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

const SLoading = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
