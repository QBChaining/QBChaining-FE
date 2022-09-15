import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getQnaListDB } from "./../../redux/async/qna";
import QnaList from "./../../components/qna/QnaList";
import QnaMainCatergory from "./../../components/qna/QnaMainCatergory";
import ModalBookmark from "../../components/common/ModalBookmark";
import WritingButton from "../../assets/images/WritingButton.png";
import ResolvedListIcon from "../../assets/images/ResolvedListIcon.png";
import NoResolvedListIcon from "../../assets/images/NoResolvedListIcon.png";
import { colorSetGreen } from "../../redux/modules/userSlice";

const QnaMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const qnaList = useSelector(state => state.qnaSlice.qnaList);
  const resolveList = qnaList.filter(data => data.is_resolve);
  const disresolveList = qnaList.filter(data => data.is_resolve === false);

  //최초진입시 qnalistdb 요청
  useEffect(() => {
    dispatch(getQnaListDB());
    dispatch(colorSetGreen());
  }, []);

  // const [pageNumber, setPageNumber] = useState(1);
  // const getList = async () => {
  //   await axios.get("http://54.180.25.241/api/qna");
  // };

  return (
    <SQnaMain>
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
        <QnaMainCatergory />
      </SMainCategory>
      <SQnaWrapper>
        <SleftConatiner>
          <SListHeader>
            <p style={{ backgroundImage: `url(${ResolvedListIcon})` }}>
              채택이 완료되었어요
            </p>
            <SListFilter>
              <ul>
                <li>추천순</li>
                <li className="active">시간순</li>
              </ul>
            </SListFilter>
          </SListHeader>
          {resolveList.map(data => (
            <QnaList data={data} key={data.id} />
          ))}
        </SleftConatiner>
        <SRightContainer>
          <SListHeader>
            <p style={{ backgroundImage: `url(${NoResolvedListIcon})` }}>
              채택을 기다리고 있어요
            </p>
            <SListFilter>
              <ul>
                <li>추천순</li>
                <li className="active">시간순</li>
              </ul>
            </SListFilter>
          </SListHeader>
          {disresolveList.map(data => (
            <QnaList data={data} key={data.id} />
          ))}
        </SRightContainer>
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
`;
const SleftConatiner = styled.div`
  max-width: 850px;
  width: 100%;
  margin-right: 40px;
`;

const SRightContainer = styled.div`
  max-width: 650px;
  width: 100%;
`;

const SListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 18px 20px 10px 20px;
  & p {
    font-weight: 600;
    padding-left: 26px;
    background-repeat: no-repeat;
    background-position: left 0 top 5px;
    font-size: 18px;
  }
`;
const SListFilter = styled.div`
  & ul {
    display: flex;

    & li {
      padding: 20px;
      cursor: pointer;
      position: relative;
      color: ${props => props.theme.color.grey5};

      &.active {
        color: ${props => props.theme.color.black};
      }
      &:first-child {
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          width: 1px;
          height: 14px;
          background-color: ${props => props.theme.color.grey2};
        }
      }
    }
  }
`;
