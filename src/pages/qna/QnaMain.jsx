import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getQnaCategoryListDB,
  getQnaMainListDB,
} from "./../../redux/async/qna";
import ContentList from "../../components/common/ContentList";
import QnaMainCatergory from "./../../components/qna/QnaMainCatergory";
import ModalBookmark from "../../components/common/ModalBookmark";
import WritingButton from "../../assets/images/WritingButton.png";
import ResolvedListIcon from "../../assets/images/ResolvedListIcon.png";
import NoResolvedListIcon from "../../assets/images/NoResolvedListIcon.png";
import { colorSetGreen } from "../../redux/modules/userSlice";
import { useInView } from "react-intersection-observer";
import { removeQnaList } from "../../redux/modules/qnaSlice";
import { Helmet } from "react-helmet-async";
import ToastViewer from "./../../components/editor/ToastViewer";
import QnaPreview from "./../../components/qna/QnaPreview";
import { ClipLoader } from "react-spinners";
import QnaMainillust from "../../assets/images/QnaMainillust.png";
import QnaWatingAnswer from "../../assets/images/QnaWatingAnswer.png";
import QnaAnswer from "../../assets/images/QnaAnswer.png";
import MainWriteButton from "../../assets/images/MainWriteButton.png";
import Hotqna from "../../assets/images/Hotqna.png";
import SideBanner from "../../components/common/SideBanner";

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { qnaList, isFetching } = useSelector(state => state.qnaSlice);
  const [category, setCategory] = useState("");
  const [resolveTap, setResolveTap] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [target, inView] = useInView();

  const onGetResolve = () => {
    setPageNumber(0);
    setHasNextPage(true);
    setResolveTap(1);
  };

  const onGetNoResolve = () => {
    setPageNumber(0);
    setHasNextPage(true);
    setResolveTap(0);
  };

  useEffect(() => {
    //다음페이지가 있다면
    const data = {
      pageNumber,
      isResolve: resolveTap,
    };

    if (hasNextPage) {
      if (category.length === 0) {
        dispatch(getQnaMainListDB(data)).then(res => {
          setHasNextPage(res.payload.length === 10);
        });
      } else if (category.length > 0) {
        dispatch(
          getQnaCategoryListDB({ category, pageNumber, isResolve: resolveTap }),
        ).then(res => {
          setHasNextPage(res.payload.length === 10);
        });
      }
      //qnalist 조회 후 res.payload.length가 10이라면 다음페이지 존재
    }
    dispatch(colorSetGreen());
  }, [pageNumber, category, resolveTap]);

  //페이지가 바닥에 닿을때마다 pageNumber+1 처리
  useEffect(() => {
    if (qnaList.length !== 0 && inView && hasNextPage) {
      setPageNumber(pageNumber => pageNumber + 1);
    }
  }, [inView]);

  //페이지 언마운트 되면 qnalist 제거
  useEffect(() => {
    return () => {
      dispatch(removeQnaList());
    };
  }, [category, resolveTap]);

  return (
    <SQnaMain>
      <Helmet>
        <title>Qna Main</title>
      </Helmet>
      <SQnaWrapper>
        <SMainCategory>
          <QnaMainCatergory
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            setCategory={setCategory}
            setHasNextPage={setHasNextPage}
          />
        </SMainCategory>
        <SContentContainer>
          <STitle>Q&A</STitle>
          <SListHeader>
            <SWritingButtonWrapper
              onClick={() => {
                navigate("/qna/write");
              }}
            >
              <SWritingButton>
                <div></div>질문하기
              </SWritingButton>
            </SWritingButtonWrapper>
            <STap>
              <STapItem
                isResolve={resolveTap}
                onClick={resolveTap !== 0 ? onGetNoResolve : onGetResolve}
              ></STapItem>
            </STap>
          </SListHeader>
          {qnaList.length === 0 && <SNodata>검색결과가 없습니다.</SNodata>}
          {qnaList.map(data => (
            <ContentList type={"qna"} data={data} key={data.id} />
          ))}
          {!isFetching && hasNextPage && (
            <SLoading ref={target}>
              <ClipLoader />
            </SLoading>
          )}
        </SContentContainer>
        <SideBanner type={"qna"} />
      </SQnaWrapper>
      <ModalBookmark />
    </SQnaMain>
  );
};

export default QnaMain;

const SQnaMain = styled.div``;

const SWritingButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 20px;
  cursor: pointer;
  width: 130px;
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SWritingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  color: ${props => props.theme.color.white};
  background-color: ${props => props.theme.color.mainOrange};
  & div {
    width: 20px;
    height: 20px;
    background-image: url(${MainWriteButton});
    background-size: contain;
    margin-right: 10px;
  }
`;

const SMainCategory = styled.div`
  position: sticky;
  top: 0;
  height: calc(100vh - 100px);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100vh;
    background-color: ${props => props.theme.color.mainNavy};
  }
`;

const SQnaWrapper = styled.div`
  display: flex;
  width: 1760px;
  padding: 0 130px;
  margin: 0 auto;
`;

const SContentContainer = styled.div`
  min-height: calc(100vh - 100px);
  flex: 1;
  margin-left: 100px;
  margin-right: 90px;
  display: flex;
  flex-direction: column;
`;

const SListHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const STap = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const STapItem = styled.li`
  width: 328px;
  height: 63px;
  padding: 20px;
  border-radius: 30px;
  background-image: url(${props =>
    props.isResolve === 0 ? QnaWatingAnswer : QnaAnswer});
  background-repeat: no-repeat;
  cursor: pointer;
`;

const SLoading = styled.div`
  min-height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SBannerWrapper = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -156px;
    left: 203px;
    width: 197px;
    height: 156px;
    background-image: url(${QnaMainillust});
  }
  &::after {
    content: "";
    position: absolute;
    top: -52px;
    left: 20px;
    width: 213px;
    height: 42px;
    background-image: url(${Hotqna});
  }
  width: 400px;
  height: 490px;
  position: sticky;
  top: 416px;
`;

const STitle = styled.h2`
  font-weight: 900;
  font-family: "Inter", sans-serif;
  font-size: 70px;
  margin-top: 30px;
  margin-bottom: 60px;
  color: ${props => props.theme.color.mainNavy};
`;

const SNodata = styled.div`
  border: ${props =>
    props.resolve
      ? `1px solid ${props.theme.color.mainGreen}`
      : `1px solid ${props.theme.color.grey3}`};
  box-shadow: ${props =>
    props.resolve
      ? "4px 6px 15px rgba(0, 0, 0, 0.1);"
      : "-4px 6px 15px rgba(0, 0, 0, 0.1)"};
  border-radius: 30px;
  margin: 20px 0;
  min-height: 209px;
  background-color: ${props => props.theme.color.white};
  font-size: 22px;
  color: ${props => props.theme.color.grey5};
  display: flex;
  align-items: center;
  justify-content: center;
`;
