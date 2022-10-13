import React, { useRef, useState } from "react";
import SearchIcon from "../../assets/images/SearchIcon.png";
import { RootState, AppDispatch } from "redux/config/configStore";
import styled from "styled-components";
import { nanoid } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

//통신
import {
  removeSearchList,
  setSearchWord,
} from "../../redux/modules/searchSlice";

//알럿
import { errorAlert } from "../../utils/swal";
import { useEffect } from "react";

const SearchInput = () => {
  const search = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchWords = searchParams.get("q");

  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useState(
    JSON.parse(localStorage.getItem("keyword") || "[]"),
  );

  //로컬스토리지에 keyword란 이름으로 keyword를 json화 시켜서 저장
  useEffect(() => {
    localStorage.setItem("keyword", JSON.stringify(keyword));
  }, [keyword]);

  const goSearch = () => {
    if (search.current.value.length === 0) {
      errorAlert("검색어를 입력해주세요!", "");
      return;
    }

    if (searchWords === search.current.value) {
      errorAlert("이전과 다른 검색어를 입력해주세요!", "");
      return;
    }

    const newKeyword = {
      id: nanoid(),
      text: search.current.value,
    };

    if (keyword.length > 9) {
      setKeyword(
        keyword.filter((data: any) => {
          return data.id !== keyword[9].id;
        }),
      );
    }

    dispatch(removeSearchList());
    dispatch(setSearchWord(search.current.value));

    // window.localStorage.setItem("search", search.current.value);
    setOpen(false);
    navigate(`/search?q=${search.current.value}`);
    for (let i = 0; i < keyword.length; i++) {
      if (keyword[i].text === search.current.value) {
        return;
      }
    }
    setKeyword((prev: any) => [newKeyword, ...prev]);
    search.current.value = "";
  };

  //엔터로 검색가능
  const onKeyPress = (e: any) => {
    if (e.key === "Enter") {
      goSearch();
    }
  };

  //외부 클릭시 닫히는 기능
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    if (wrapperRef && !wrapperRef.current?.contains(event.target)) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const keywordClearHandler = (id: number) => {
    setKeyword(
      keyword.filter((data: any) => {
        return data.id !== id;
      }),
    );
  };

  return (
    <SSearchInput ref={wrapperRef}>
      <SInput
        onKeyPress={onKeyPress}
        onClick={() => {
          setOpen(true);
        }}
        maxLength={20}
        ref={search}
        type="text"
        placeholder="검색어를 입력해주세요!"
      />
      <SSearchButton onClick={goSearch}>검색</SSearchButton>
      {open && (
        <SSearchWordList>
          {keyword.length < 1 && <SNoword>검색어가 없습니다!</SNoword>}
          {keyword.map((data: any) => (
            <SSearchWord
              key={data.id}
              onClick={() => {
                navigate(`/search?q=${data.text}`);
                setOpen(false);
              }}
            >
              <SSearchWordText>{data.text}</SSearchWordText>
              <SSearchDeleteButton
                onClick={e => {
                  e.stopPropagation();
                  keywordClearHandler(data.id);
                }}
              >
                삭제
              </SSearchDeleteButton>
            </SSearchWord>
          ))}
          {keyword.length > 0 && (
            <SDeleteAllButton
              onClick={() => {
                setKeyword([]);
              }}
            >
              전체삭제
            </SDeleteAllButton>
          )}
        </SSearchWordList>
      )}
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
  z-index: 1;
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

const SSearchWordList = styled.ul`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 50px;
  border: 1px solid #939393;
  background-color: white;
  border-radius: 30px;
  z-index: -1;
  color: black;
`;

const SSearchWord = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 70px;
  background-color: ${props => props.theme.color.white};
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const SSearchWordText = styled.div``;

const SSearchDeleteButton = styled.button`
  border: none;
  width: 87px;
  padding: 10px;
  background-color: transparent;

  &:hover {
    color: #1a73e8;
  }
`;

const SDeleteAllButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 0 0 30px 30px;
  &:hover {
    color: #1a73e8;
  }
`;

const SNoword = styled.div`
  padding: 12px 120px 12px 70px;
  color: ${props => props.theme.color.grey5};
`;
