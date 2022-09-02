import React from "react";
import { useState } from "react";
import styled from "styled-components";

const InterestItem = ({ data, setList, list }) => {
  const [toggle, setToggle] = useState(false);

  const onToggleHandler = name => {
    setToggle(!toggle);
    if (list.indexOf(name) !== -1) {
      list.splice(list.indexOf(name), 1);
      return;
    }
    setList([...list, data.interestName]);
  };

  return (
    <SList
      toggle={toggle}
      onClick={() => {
        onToggleHandler(data.interestName);
      }}
    >
      {data.interestName}
    </SList>
  );
};

export default InterestItem;

const SList = styled.li`
  padding: 20px;
  cursor: pointer;
  border: 1px solid black;
  background-color: ${props => (props.toggle ? "black" : "white")};
  color: ${props => (props.toggle ? "white" : "black")};
`;
