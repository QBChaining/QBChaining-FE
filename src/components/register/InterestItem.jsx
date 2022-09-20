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
    setList([...list, data.name]);
  };

  return (
    <SList
      toggle={toggle}
      onClick={() => {
        onToggleHandler(data.name);
      }}
    >
      {data.name}
    </SList>
  );
};

export default InterestItem;

const SList = styled.li`
  padding: 10px 30px;
  cursor: pointer;
  border: 1px solid
    ${props => (props.toggle ? "white" : props.theme.color.grey5)};
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 30px;
  background: ${props =>
    props.toggle ? props.theme.color.backgroundGradient : "white"};
  color: ${props => (props.toggle ? "white" : "black")};
`;
