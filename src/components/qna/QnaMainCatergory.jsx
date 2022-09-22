import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import categories from "./../../utils/category";

const QnaMainCatergory = ({
  pageNumber,
  setPageNumber,
  setCategory,
  setHasNextPage,
}) => {
  const category = categories.qnaCategory;

  const lists = useRef();

  return (
    <SQnaMainCatergory ref={lists}>
      {category.map(list => (
        <div key={list.id}>
          <input
            type="radio"
            name="category"
            value={list.name}
            id={list.name}
          />
          <SQnaCategoryList
            htmlFor={list.name}
            onClick={() => {
              setPageNumber(0);
              setCategory(list.name);
              setHasNextPage(true);
            }}
          >
            {list.name}
          </SQnaCategoryList>
        </div>
      ))}
    </SQnaMainCatergory>
  );
};

export default QnaMainCatergory;

const SQnaMainCatergory = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1560px;
  width: 100%;

  & div {
    display: flex;
  }

  & input {
    display: none;
  }

  & input:checked + label {
    color: ${props => props.theme.color.mainGreen};
    background-color: ${props => props.theme.color.white};
  }
`;

const SQnaCategoryList = styled.label`
  padding: 10px 30px;
  font-size: 20px;
  border-radius: 30px;
  margin: 0 5px;
  cursor: pointer;
  color: ${props => props.theme.color.white};
  &:hover {
    color: ${props => props.theme.color.mainGreen};
    background-color: ${props => props.theme.color.white};
  }
`;
