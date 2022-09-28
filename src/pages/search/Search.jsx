import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import ContentList from "../../components/common/ContentList";
import {
  getBlogSearchListDB,
  getQnaSearchListDB,
} from "./../../redux/async/search";
import { useInView } from "react-intersection-observer";
import {
  removeSearchList,
  setSearchWord,
} from "../../redux/modules/searchSlice";
import { ClipLoader } from "react-spinners";
import SearchList from "./../../components/search/SearchList";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const dispatch = useDispatch();
  const { blogSearchList } = useSelector(state => state.searchSlice);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchWord = searchParams.get("q");

  // const searchWord = queryString.parse(window.location.search).q;
  // useEffect(() => {
  //   if (searchWord) {
  //     dispatch(getQnaSearchListDB(searchWord));
  //     dispatch(getBlogSearchListDB(searchWord));
  //   }
  // }, [searchWord]);

  useEffect(() => {
    return () => {
      dispatch(removeSearchList());
    };
  }, [searchWord]);

  return (
    <SSearch>
      <STitle>{searchWord}에 대한 검색결과</STitle>
      <SWrapper>
        <SLeftContainer>
          <SearchList searchWord={searchWord} type={"qna"} />
        </SLeftContainer>
        <SRightContainer>
          <SearchList searchWord={searchWord} type={"blog"} />
        </SRightContainer>
      </SWrapper>
    </SSearch>
  );
};

export default Search;

const SSearch = styled.div`
  min-width: 1300px;
  padding: 0 120px;
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
      background-color: ${props => props.theme.color.mainOrange};
    }
  }
`;

const SRightContainer = styled(STip)`
  & > div:first-child {
    &::before {
      content: "BLOG";
      background-color: ${props => props.theme.color.mainOrange};
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

const SLoading = styled.div`
  min-height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
