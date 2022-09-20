import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getQnaCategoryListDB,
  getCompletionListDB,
  getInCompletionListDB,
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

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { qnaList, isFetching } = useSelector(state => state.qnaSlice);
  const [category, setCategory] = useState("");
  const [resolveTap, setResolveTap] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [target, inView] = useInView();

  const onGetResolve = () => {
    setResolveTap(true);
  };

  const onGetNoResolve = () => {
    setResolveTap(false);
  };

  useEffect(() => {
    //다음페이지가 있다면
    if (hasNextPage) {
      if (category.length === 0) {
        if (!resolveTap) {
          dispatch(getInCompletionListDB(pageNumber)).then(res => {
            setHasNextPage(res.payload.length === 10);
          });
        } else {
          dispatch(getCompletionListDB(pageNumber)).then(res => {
            setHasNextPage(res.payload.length === 10);
          });
        }
      } else if (category.length > 0) {
        dispatch(getQnaCategoryListDB({ category, pageNumber })).then(res => {
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
      <SHeader>
        <SWritingButtonWrapper
          onClick={() => {
            navigate("/qna/write");
          }}
        >
          <SWritingTitle>궁금한걸 물어보세요!</SWritingTitle>
          <SWritingInfo>클릭하시면 질문 작성페이지로 이동합니다</SWritingInfo>
          <SWritingButton icon={WritingButton} />
        </SWritingButtonWrapper>
      </SHeader>
      <SMainCategory>
        <QnaMainCatergory
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          setCategory={setCategory}
          setHasNextPage={setHasNextPage}
        />
      </SMainCategory>
      <SQnaWrapper>
        <QnaPreview />
        <SContentContainer>
          <SListHeader>
            <STap>
              <STapItem
                onClick={onGetResolve}
                className={resolveTap && "isActive"}
              >
                <p>채택이 완료되었어요</p>
              </STapItem>
              <STapItem
                onClick={onGetNoResolve}
                className={!resolveTap && "isActive"}
              >
                <p>채택을 기다리고 있어요</p>
              </STapItem>
            </STap>
          </SListHeader>
          {qnaList.map(data => (
            <ContentList type={"qna"} data={data} key={data.id} />
          ))}
          {!isFetching && <div ref={target} style={{ height: "1px" }}></div>}
        </SContentContainer>
      </SQnaWrapper>
      <ModalBookmark />
    </SQnaMain>
  );
};

export default QnaMain;

const SQnaMain = styled.div``;

const SHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.color.mainGreen};
  padding: 35px 20px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: calc(100% - 88px);
    transform: translateX(-50%);
    height: 1px;
    background-color: ${props => props.theme.color.white};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: calc(100% - 88px);
    transform: translateX(-50%);
    height: 1px;
    background-color: ${props => props.theme.color.white};
  }
`;

const SWritingButtonWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 1230px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.color.white};
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='30' ry='30' stroke='white' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 30px;
`;

const SWritingTitle = styled.h2`
  font-weight: 600;
  font-size: 30px;
  margin-top: 61px;
  margin-bottom: 5px;
`;

const SWritingInfo = styled.p`
  font-size: 20px;
`;

const SWritingButton = styled.button`
  background-color: ${props => props.theme.color.white};
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: none;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-position: center center;
  margin: 30px 0 43px 0;
`;

const SMainCategory = styled.div`
  background-color: ${props => props.theme.color.mainGreen};
  padding: 20px 20px 26px 20px;
  display: flex;
  justify-content: center;
`;

const SQnaWrapper = styled.div`
  display: flex;
  max-width: 1560px;
  padding: 0 20px;
  margin: 0 auto;
  gap: 40px;
`;

const SContentContainer = styled.div`
  max-width: 735px;
  width: 100%;
`;

const SListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const STap = styled.ul`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const STapItem = styled.li`
  width: 50%;
  padding: 20px;
  border-radius: 30px;
  cursor: pointer;
  &.isActive {
    background-color: ${props => props.theme.color.mainGreen};
    color: ${props => props.theme.color.white};
  }
  & p {
    display: flex;
    justify-content: center;
    font-weight: 600;
    font-size: 18px;
  }
`;
