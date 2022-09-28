import React from "react";
import { useState } from "react";
import styled from "styled-components";

const InterestItem = ({ data, setLanguage, language }) => {
  const [toggle, setToggle] = useState(false);

  console.log(language);

  const onToggleHandler = name => {
    setToggle(!toggle);
    if (language.indexOf(name) !== -1) {
      language.splice(language.indexOf(name), 1);
      return;
    }
    setLanguage([...language, data.name]);
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
  transition: 0.3s;
  background-color: ${props =>
    props.toggle ? props.theme.color.mainOrange : "white"};
  color: ${props => (props.toggle ? "white" : "black")};
`;
