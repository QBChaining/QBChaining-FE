import React, { useRef, useState } from "react";
import styled from "styled-components";
import categories from "../../utils/category";

type TQnaMainCatergory = {
  pageNumber: string;
  setPageNumber: any;
  setCategory: any;
  setHasNextPage: any;
};

const QnaMainCatergory = ({
  pageNumber,
  setPageNumber,
  setCategory,
  setHasNextPage,
}: TQnaMainCatergory) => {
  const category = categories.qnaCategory;

  const lists = useRef();
  const [check, setCheck] = useState("");

  const onSelectCategoryHandler = (name: string) => {
    //중복클릭 방지
    if (name === check) {
      return;
    }
    setCheck(name);
    setPageNumber(0);
    setCategory(name);
    setHasNextPage(true);
  };

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
              onSelectCategoryHandler(list.name);
            }}
          >
            <div>{list.name}</div>
          </SQnaCategoryList>
        </div>
      ))}
    </SQnaMainCatergory>
  );
};

export default QnaMainCatergory;

const SQnaMainCatergory = styled.div`
  margin-top: 178px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & div {
    display: flex;
  }

  & input {
    display: none;
  }

  & input:checked + label {
    color: ${props => props.theme.color.mainGreen};
    border-bottom: 1px solid ${props => props.theme.color.mainOrange};
    & div {
      color: ${props => props.theme.color.mainOrange};

      &::before {
        background-color: ${props => props.theme.color.mainOrange};
      }
    }
  }
`;

const SQnaCategoryList = styled.label`
  padding: 12px 20px 12px 60px;
  border-bottom: 1px solid ${props => props.theme.color.mainNavy};
  font-size: 18px;
  font-weight: 500;
  transition: 0.3s;

  & div {
    transition: 0.3s;
    position: relative;
    &::before {
      transition: 0.3s;
      content: "";
      position: absolute;
      bottom: -17px;
      left: -20px;
      width: calc(100% + 40px);
      height: 5px;
      background-color: ${props => props.theme.color.mainNavy};
    }
  }
  cursor: pointer;
  /* color: ${props => props.theme.color.white}; */
  &:hover {
    border-bottom: 1px solid ${props => props.theme.color.mainOrange};
    & div {
      color: ${props => props.theme.color.mainOrange};

      &::before {
        background-color: ${props => props.theme.color.mainOrange};
      }
    }
  }
`;
