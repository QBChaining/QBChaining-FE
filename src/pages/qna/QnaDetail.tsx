import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

//무한스크롤
import { ClipLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";

//통신
import { getOneQnaListDB, getCommentListDB } from "../../redux/async/qna";
import { removeCommentList, removeQnaList } from "../../redux/modules/qnaSlice";
import { removeErrorMessage } from "../../redux/modules/qnaSlice";

//컴포넌트
import QnaCommentList from "../../components/qna/QnaCommentList";
import QnaTarget from "../../components/qna/QnaTarget";
import EditorComponent from "../../components/common/EditorComponent";

//알럿
import { errorAlert, networkError } from "../../utils/swal";

//이미지
import QnaWriteArrow from "../../assets/images/QnaWriteArrow.png";

const QnaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    qnaTarget: target,
    commentList: list,
    isCommentFetching,
    isDetailFetcing,
    detailErrorMessage,
  } = useSelector(state => state.qnaSlice);

  const [pageNumber, setPageNumber] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [infiniteTarget, inView] = useInView();

  useEffect(() => {
    if (detailErrorMessage === "게시글이 존재하지 않습니다.") {
      errorAlert(detailErrorMessage);
      return navigate("/qna", { replace: true });
    }
  }, [detailErrorMessage]);

  useEffect(() => {
    dispatch(getOneQnaListDB(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(removeQnaList());
      dispatch(removeErrorMessage());
    };
  }, []);

  //코멘트 무한스크롤
  useEffect(() => {
    let data = {
      id,
      pageNumber,
    };
    dispatch(getCommentListDB(data)).then(res =>
      setHasNextPage(res.payload.commentLists.length === 10),
    );
  }, [id, pageNumber]);

  //페이지가 바닥에 닿을때마다 pageNumber+1
  useEffect(() => {
    if (list.length !== 0 && inView && hasNextPage) {
      setPageNumber(pageNumber => pageNumber + 1);
    }
  }, [inView]);

  useEffect(() => {
    return () => {
      dispatch(removeCommentList());
    };
  }, []);

  return (
    <SQnaDetail>
      <Helmet>
        <title>Qna Detail</title>
      </Helmet>
      <SLeftContainer>
        {!isDetailFetcing ? (
          <>
            <SLeftHeader>
              <QnaTarget isDatail={true} />
            </SLeftHeader>
            <SLeftBody>
              <h3>답변 {list.length}개</h3>
              <QnaCommentList
                author={target.user?.userName}
                resolve={target.isResolve}
                id={id}
                qnaId={id}
              />
            </SLeftBody>
            {!isCommentFetching && hasNextPage && (
              <SLoading ref={infiniteTarget}>
                <ClipLoader />
              </SLoading>
            )}
          </>
        ) : (
          <SLoading>
            <ClipLoader />
          </SLoading>
        )}
      </SLeftContainer>
      <SRightContainer>
        <SAddCommentTitle>댓글 작성</SAddCommentTitle>
        <EditorComponent isCommentWrite={true} id={id} />
      </SRightContainer>
      {/* <ModalBookmark isWrite={true} /> */}
    </SQnaDetail>
  );
};

export default QnaDetail;

const SQnaDetail = styled.div`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
`;

const SLeftContainer = styled.div`
  width: 50%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

const SLeftHeader = styled.div`
  padding-left: 200px;
  padding-right: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const SLeftBody = styled.div`
  flex: 1;
  padding-left: 200px;
  padding-right: 30px;
  background-color: #f4f5f6;
  display: flex;
  flex-direction: column;

  h3 {
    padding: 20px;
  }
`;

const SRightContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 100px 130px 50px 50px;
  width: 50%;
  overflow: auto;
  background-color: ${props => props.theme.color.mainNavy};
  color: white;
  &::before {
    content: "";
    position: absolute;
    top: 100px;
    left: -4px;
    width: 53px;
    height: 53px;
    background-image: url(${QnaWriteArrow});
    background-repeat: no-repeat;
    z-index: 1;
  }
`;

const SAddCommentTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  padding: 0 0 30px 0;
`;

const SLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
