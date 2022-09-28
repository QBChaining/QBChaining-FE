import React, { useRef } from "react";
import SearchIcon from "../../assets/images/SearchIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSearchList,
  setSearchWord,
} from "../../redux/modules/searchSlice";
import { errorAlert } from "../../utils/swal";
import { useSearchParams } from "react-router-dom";

const SearchInput = () => {
  const search = useRef();
  const { searchWord } = useSelector(state => state.searchSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWords = searchParams.get("q");

  const goSearch = () => {
    if (search.current.value.length === 0) {
      errorAlert("검색어를 입력해주세요!");
      return;
    }

    if (searchWords === search.current.value) {
      errorAlert("이전과 다른 검색어를 입력해주세요!");
      return;
    }

    dispatch(removeSearchList());
    dispatch(setSearchWord(search.current.value));

    navigate(`/search?q=${search.current.value}`);
    search.current.value = "";
  };

  return (
    <SSearchInput>
      <SInput ref={search} type="text" placeholder="검색어를 입력해주세요!" />
      <SSearchButton onClick={goSearch}>검색</SSearchButton>
    </SSearchInput>
  );
};

export default SearchInput;

const SSearchInput = styled.div`
  flex: 1;
  max-width: 900px;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    transform: translateY(-50%);
    left: 50px;
    width: 1px;
    height: 21px;
    background-color: #474747;
  }
`;

const SInput = styled.input`
  width: 100%;
  padding: 12px 120px 12px 70px;
  border-radius: 30px;
  border: 1px solid #939393;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: left 16px center;
  font-size: 15px;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const SSearchButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 87px;
  border-radius: 30px;
  background-color: #1e1e1e;
  border: none;
  color: white;
  font-size: 15px;
`;
