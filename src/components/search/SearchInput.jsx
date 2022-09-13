import React, { useRef } from "react";
import SearchIcon from "../../assets/images/SearchIcon.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const search = useRef();
  const navigate = useNavigate();
  const goSearch = () => {
    navigate(`/search?q=${search.current.value}`);
  };

  return (
    <SSearchInput>
      <SInput ref={search} type="text" placeholder="Javascript" />
      <SSearchButton
        onClick={
          goSearch
          // axios.get(`http://kpzzy.shop/api/search?q=node`).then(res => {
          //   console.log(res);
          // });
        }
      >
        검색
      </SSearchButton>
    </SSearchInput>
  );
};

export default SearchInput;

const SSearchInput = styled.div`
  max-width: 600px;
  min-width: 200px;
  width: 100%;
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
  color: white;
  font-size: 15px;
`;