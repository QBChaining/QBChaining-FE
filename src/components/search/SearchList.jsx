import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import ContentList from "../common/ContentList";
import {
  getBlogSearchListDB,
  getQnaSearchListDB,
} from "../../redux/async/search";
import { useInView } from "react-intersection-observer";
import {
  removeSearchList,
  setSearchWord,
} from "../../redux/modules/searchSlice";
import { ClipLoader } from "react-spinners";
import { nanoid } from "@reduxjs/toolkit";

const SearchList = ({ searchWord, type }) => {
  const dispatch = useDispatch();
  const { qnaSearchList, blogSearchList, isFetching } = useSelector(
    state => state.searchSlice,
  );

  const [pageNumber, setPageNumber] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [target, inView] = useInView();

  useEffect(() => {
    setPageNumber(0);
    setHasNextPage(true);
  }, [searchWord]);

  //무한스크롤
  useEffect(() => {
    let data = {
      word: searchWord,
      pageNumber,
    };

    //qnalist 조회 후 res.payload.length가 10이라면 다음페이지 존재

    if (type === "qna") {
      dispatch(getQnaSearchListDB(data)).then(res => {
        setHasNextPage(res.payload.length === 10);
      });
    } else if (type === "blog") {
      dispatch(getBlogSearchListDB(data)).then(res => {
        setHasNextPage(res.payload.length === 10);
      });
    }
  }, [searchWord, pageNumber]);

  //페이지가 바닥에 닿을때마다 pageNumber+1
  useEffect(() => {
    if (type === "qna") {
      if (qnaSearchList.length !== 0 && inView && hasNextPage) {
        setPageNumber(pageNumber => pageNumber + 1);
      }
    } else if (type === "blog") {
      if (blogSearchList.length !== 0 && inView && hasNextPage) {
        setPageNumber(pageNumber => pageNumber + 1);
      }
    }
  }, [inView]);

  if (type === "qna") {
    return (
      <>
        {qnaSearchList.length !== 0 ? (
          qnaSearchList.map(data => (
            <ContentList
              isSearch={true}
              type={type}
              data={data}
              key={nanoid()}
            />
          ))
        ) : (
          <SNodata>검색결과가 없습니다.</SNodata>
        )}
        {!isFetching && hasNextPage && (
          <SLoading ref={target}>
            <ClipLoader />
          </SLoading>
        )}
      </>
    );
  } else if (type === "blog") {
    return (
      <>
        {blogSearchList.length !== 0 ? (
          blogSearchList.map(data => (
            <ContentList
              isSearch={true}
              type={type}
              data={data}
              key={nanoid()}
            />
          ))
        ) : (
          <SNodata>검색결과가 없습니다.</SNodata>
        )}
        {!isFetching && hasNextPage && (
          <SLoading ref={target}>
            <ClipLoader />
          </SLoading>
        )}
      </>
    );
  }
};

export default SearchList;

const SNodata = styled.div`
  padding-left: 30px;
  border: ${props =>
    props.resolve
      ? `1px solid ${props.theme.color.mainOrange}`
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
