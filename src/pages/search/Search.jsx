import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import ContentList from "../../components/common/ContentList";
import {
  getBlogSearchListDB,
  getQnaSearchListDB,
} from "./../../redux/async/search";
import { setSearchWord } from "../../redux/modules/searchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { qnaSearchList, blogSearchList, searchWord } = useSelector(
    state => state.searchSlice,
  );

  useEffect(() => {
    dispatch(setSearchWord(queryString.parse(window.location.search).q));
    if (searchWord) {
      dispatch(getQnaSearchListDB(searchWord));
      dispatch(getBlogSearchListDB(searchWord));
    }
  }, [searchWord]);

  return (
    <SSearch>
      <STitle>{searchWord}에 대한 검색결과</STitle>
      <SWrapper>
        <SLeftContainer>
          {qnaSearchList.length !== 0 ? (
            qnaSearchList.map(data => (
              <ContentList
                isSearch={true}
                type={"qna"}
                data={data}
                key={data.id}
              />
            ))
          ) : (
            <SNodata>검색결과가 없습니다.</SNodata>
          )}
        </SLeftContainer>
        <SRightContainer>
          {blogSearchList.length !== 0 ? (
            blogSearchList.map(data => (
              <ContentList
                isSearch={true}
                type={"blog"}
                data={data}
                key={data.id}
              />
            ))
          ) : (
            <SNodata>검색결과가 없습니다.</SNodata>
          )}
        </SRightContainer>
      </SWrapper>
    </SSearch>
  );
};

export default Search;

const SSearch = styled.div`
  width: 1560px;
  padding: 0 20px;
  margin: 0 auto;
`;

const STitle = styled.h2`
  font-size: 30px;
  font-weight: 400;
  padding-top: 70px;
`;

const SWrapper = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 70px;
`;

const STip = styled.div`
  width: 50%;

  & > div:first-child {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      text-align: center;
      padding-top: 10px;
      width: 160px;
      height: 90px;
      top: 0;
      transform: translateY(-50%);
      z-index: -1;
      left: 0;
      border-radius: 30px 30px 0 0;
      color: ${props => props.theme.color.white};
      font-size: 24px;
      font-weight: 600;
    }
  }
`;

const SLeftContainer = styled(STip)`
  & > div:first-child {
    &::before {
      content: "Q&A";
      background-color: ${props => props.theme.color.mainGreen};
    }
  }
`;

const SRightContainer = styled(STip)`
  & > div:first-child {
    &::before {
      content: "BLOG";
      background-color: ${props => props.theme.color.mainBlue};
    }
  }
`;

const SNodata = styled.div`
  padding-left: 30px;
  border: ${props =>
    props.resolve
      ? `1px solid ${props.theme.color.mainGreen}`
      : `1px solid ${props.theme.color.grey3}`};
  box-shadow: ${props =>
    props.resolve
      ? "4px 6px 15px rgba(0, 0, 0, 0.1);"
      : "-4px 6px 15px rgba(0, 0, 0, 0.1)"};
  border-radius: 30px;
  margin: 30px 0;
  min-height: 209px;
  background-color: ${props => props.theme.color.white};
  font-size: 22px;
  color: ${props => props.theme.color.grey5};
  display: flex;
  align-items: center;
`;
