import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";
import styled from "styled-components";
import ContentList from "../../components/common/ContentList";

const Search = () => {
  const dispatch = useDispatch();
  const { qnaSearchList, blogSearchList, searchWord } = useSelector(
    state => state.searchSlice,
  );

  return (
    <SSearch>
      <STitle>{searchWord}에 대한 검색결과</STitle>
      <SWrapper>
        <SLeftContainer>
          {qnaSearchList.map(data => (
            <ContentList data={data} key={data.id} />
          ))}
        </SLeftContainer>
        <SRightContainer>
          {blogSearchList.map(data => (
            <ContentList data={data} key={data.id} />
          ))}
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

const SLeftContainer = styled.div`
  width: 50%;

  & div:first-child {
  }
`;
const SRightContainer = styled.div`
  width: 50%;
`;
