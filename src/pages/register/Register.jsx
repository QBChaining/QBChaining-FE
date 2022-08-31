import React, { useState } from "react";
import categories from "../../utils/category";
import styled from "styled-components";

const Interest = ({ data, setList, list }) => {
  const [toggle, setToggle] = useState(false);

  const onToggleHandler = name => {
    setToggle(!toggle);
    if (list.indexOf(name) === -1) {
      setList([...list, data.interestName]);
    }
    console.log(list.indexOf(name));
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

const Register = () => {
  const [list, setList] = useState([]);
  console.log(list);
  return (
    <div>
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {categories.interestCategory.map(data => (
          <Interest
            data={data}
            setList={setList}
            list={list}
            key={data.interestId}
          ></Interest>
        ))}
      </ul>
    </div>
  );
};

export default Register;

const SList = styled.li`
  padding: 20px;
  cursor: pointer;
  border: 1px solid black;
  background-color: ${props => (props.toggle ? "black" : "white")};
  color: ${props => (props.toggle ? "white" : "black")};
`;
