import React from "react";
import { useState } from "react";
import styled from "styled-components";
import selectArrow from "../../assets/images/SelectArrow.png";

const Select = ({ options, setOption, initialText }) => {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState(initialText);
  const onOpenHandler = () => {
    setOpen(!open);
  };

  const onSetOptionHandler = value => {
    setInitial(value);
    setOption(value);
    setOpen(!open);
  };

  return (
    <SSelectWrapper>
      <SSelect open={open} onClick={onOpenHandler} type="button">
        {initial}
      </SSelect>
      {open && (
        <SLists>
          {options.map(data => (
            <SItem
              key={data.langId}
              onClick={() => {
                onSetOptionHandler(data.langName);
              }}
            >
              {data.langName}
            </SItem>
          ))}
        </SLists>
      )}
    </SSelectWrapper>
  );
};

export default Select;

const SSelectWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const SSelect = styled.button`
  min-width: 251px;
  width: 30%;
  padding: 10px 30px;
  appearance: none;
  border: 1px solid #939393;
  border-radius: 100px;
  text-align: left;
  background-color: ${props => props.theme.color.white};
  z-index: 2;
  position: relative;
  &::before {
    position: absolute;
    content: "";
    top: 50%;
    right: 30px;
    background-image: url(${selectArrow});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 12px;
    height: 12px;
    transform: translateY(-50%)
      rotate(${props => (props.open ? "180deg" : "0deg")});
  }
`;

const SLists = styled.ul`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid #939393;
  border-radius: 30px;
  background-color: ${props => props.theme.color.white};
  z-index: -1;
  padding-top: 10px;
  overflow: hidden;
`;

const SItem = styled.li`
  padding: 5px 30px;
  border-bottom: 1px solid ${props => props.theme.color.grey2};
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.color.grey2};
  }

  &:first-child {
    padding-top: 40px;
  }
  &:last-child {
    border-bottom: none;
  }
`;
