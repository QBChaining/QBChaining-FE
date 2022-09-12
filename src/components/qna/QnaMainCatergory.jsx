import React, { Fragment, useEffect, useRef } from "react";
import styled from "styled-components";
import categories from "./../../utils/category";
import { useDispatch } from "react-redux";
import { getQnaCategoryListDB } from "../../redux/async/qna";

const QnaMainCatergory = () => {
  const category = categories.qnaCategory;
  const dispatch = useDispatch();
  const lists = useRef();

  //초기카테고리 선택이 필요하면 활성화
  // useEffect(() => {
  //   if (lists) {
  //     lists.current.firstChild.firstChild.checked = true;
  //   }
  // }, []);

  const onGetCategory = name => {
    dispatch(getQnaCategoryListDB(name));
  };

  return (
    <SQnaMainCatergory ref={lists}>
      {category.map(list => (
        <div key={list.langId}>
          <input
            type="radio"
            name="category"
            value={list.langName}
            id={list.langName}
          />
          <SQnaCategoryList
            htmlFor={list.langName}
            onClick={() => {
              onGetCategory(list.langName);
            }}
          >
            {list.langName}
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
  max-width: 1230px;
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
  cursor: pointer;
  color: ${props => props.theme.color.white};
  &:hover {
    color: ${props => props.theme.color.mainGreen};
    background-color: ${props => props.theme.color.white};
  }
`;
