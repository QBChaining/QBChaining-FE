import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 가져오기

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
  const Today = dayjs(new Date()).add(-29, "day");
  const day = Today.add(index, "day").format("YYYY-MM-DD");
  const [hover, setHover] = useState(false);

  return (
    <SCube
      length={length}
      style={{ position: "relative" }}
      onMouseEnter={() => {
        setHoverDay(day);
        setHoverData(data);
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false);
      }}
    >
      {hover && (
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
    props.length > 6
      ? "#FF6E5A"
      : props.length > 3
      ? "#FF9A8C"
      : props.length > 1
      ? "#FFBBB1"
      : props.length > 0
      ? "#FFE3DF"
      : props.theme.color.white};
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
  transform: translateX(-100px);
  font-size: 12px;
`;
