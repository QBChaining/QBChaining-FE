import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyPageCube = ({
  data,
  hoverData,
  index,
  setHoverDay,
  setHoverData,
  length,
  hoverDay,
}) => {
  dayjs.locale("ko");
  const Today = dayjs(new Date());
  const day = Today.add(-index, "day").format("YYYY-MM-DD");
  const [a, setA] = useState(false);

  // for (let i = 0; i < 27; i++) {
  //   const day = Today.add(-index, "day").format("YYYY-MM-DD");

  return (
    <SCube
      length={length}
      style={{ position: "relative" }}
      onMouseEnter={() => {
        setHoverDay(day);
        setHoverData(data);
        setA(true);
      }}
      onMouseOut={() => {
        setA(false);
      }}
    >
      {a && (
        <SActiveData>
          {hoverDay}에 &nbsp;
          {hoverData.length
            ? hoverData.length + "개의 활동 기록이 있습니다"
            : "활동 기록이 없습니다!"}
        </SActiveData>
      )}
    </SCube>
  );
};

export default MyPageCube;

const SCube = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 1);
  background-color: ${props =>
    props.length > 5
      ? "rgb(248, 143, 117)"
      : props.length > 4
      ? "rgb(253, 163, 140)"
      : props.length > 3
      ? "rgb(255, 178, 159)"
      : props.length > 2
      ? "rgb(251, 191, 177)"
      : props.length > 1
      ? "rgb(250, 202, 189)"
      : props.length > 0
      ? "rgb(226, 226, 226)"
      : props.theme.color.black};
`;

const SActiveData = styled.div`
  position: absolute;
  top: -50px;
  width: 250px;
  height: 40px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.color.mainNavy};
  color: ${props => props.theme.color.white};
  border-radius: 10px;
  z-index: 99;
  transform: translateX(-80px);
  font-size: 12px;
`;
