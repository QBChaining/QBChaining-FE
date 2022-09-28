import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneQnaListDB } from "../../redux/async/qna";
import { colorSetGreen } from "../../redux/modules/userSlice";
import QnaCommentList from "./../../components/qna/QnaCommentList";
import QnaTarget from "../../components/qna/QnaTarget";
import styled from "styled-components";
import QnaWriteArrow from "../../assets/images/QnaWriteArrow.png";
import EditorComponent from "../../components/common/EditorComponent";
import { Helmet } from "react-helmet-async";
import { removeCommentList, removeQnaList } from "../../redux/modules/qnaSlice";
import { ClipLoader } from "react-spinners";
import { useInView } from "react-intersection-observer";
import { getCommentListDB } from "./../../redux/async/qna";
import { errorAlert } from "../../utils/swal";
import { networkError } from "./../../utils/swal";

const QnaDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const target = useSelector(state => state.qnaSlice.qnaTarget);
  const isDetailFetcing = useSelector(state => state.qnaSlice.isDetailFetcing);
  const { commentList: list, isCommentFetching } = useSelector(
    state => state.qnaSlice,
  );

  const [pageNumber, setPageNumber] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [infiniteTarget, inView] = useInView();

  useEffect(() => {
    dispatch(getOneQnaListDB(id)).then(
      res =>
        res.payload === undefined &&
        networkError("네트워크 상태가 좋지 않거나 없는 페이지입니다!").then(
          res => {
            (res.isConfirmed || res.isDismissed) &&
              navigate("/", { replace: true });
          },
        ),
    );
    dispatch(colorSetGreen());
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(removeQnaList());
    };
  }, []);

  console.log(list);

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
            <QnaTarget isDatail={true} />
            <QnaCommentList
              author={target.user?.userName}
              resolve={target.isResolve}
              id={id}
              qnaId={id}
            />
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
  display: flex;
  min-height: calc(100vh - 100px);
  margin: 0 auto;
`;

const SLeftContainer = styled.div`
  width: 50%;
  padding-left: 200px;
  padding-right: 30px;
  display: flex;
  flex-direction: column;
`;

const SRightContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  padding: 100px 200px 50px 50px;
  width: 50%;
  overflow: auto;
  background-color: ${props => props.theme.color.mainNavy};
  color: white;
  &::before {
    content: "";
    position: absolute;
    top: 150px;
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
  padding: 60px 0 30px 0;
`;

const SLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
