import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const InterestItem = ({ isEdit, data, setLanguage, language, language2 }) => {
  const [toggle, setToggle] = useState(false);

  // console.log(language);

  const onToggleHandler = name => {
    setToggle(!toggle);
    if (language.indexOf(name) !== -1) {
      setLanguage(
        language.filter(data => {
          return data !== name;
        }),
      );
      // language.splice(language.indexOf(name), 1);
      return;
    }
    setLanguage([...language, data.name]);
  };

  useEffect(() => {
    if (isEdit && language?.includes(data.name)) {
      setToggle(true);
    }
    // if (language.includes(data.name)) {
    //   console.log("hello");
    // }
  }, [language2]);

  return (
    <SList
      toggle={toggle}
      language={language}
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
