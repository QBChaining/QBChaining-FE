import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Search = () => {
  const { qnaSearchList, blogSearchList } = useSelector(
    state => state.searchSlice,
  );
  return <div>검색창입니다</div>;
};

export default Search;
