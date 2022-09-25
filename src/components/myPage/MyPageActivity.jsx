import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MyPageCube from "./MyPageCube";

const MyPageActivity = () => {
  dayjs.locale("ko");

  const { userActivity } = useSelector(state => state.userSlice);

  const [cube, setCube] = useState([]);
  const [hoverDay, setHoverDay] = useState("");
  const [hoverData, setHoverData] = useState([]);

  //큐브만들기 반복문
  useEffect(() => {}, []);

  useEffect(() => {
    setCube(userActivity);
  }, [userActivity]);

  console.log(cube);

  return (
    <>
      {/* <SCubeWrapper>
        {userActivity.map((data, i) => (
          <Cube setHoverDay={setHoverDay} key={i} data={data} />
        ))}
      </SCubeWrapper>
      <SCubeWrapper>
        {week2.map((data, i) => (
          <Cube setHoverDay={setHoverDay} key={i} data={data} />
        ))}
      </SCubeWrapper>
      <SCubeWrapper>
        {week3.map((data, i) => (
          <Cube setHoverDay={setHoverDay} key={i} data={data} />
        ))}
      </SCubeWrapper> */}
      <SCubeWrapper>
        {cube.map((data, i) => {
          return (
            <MyPageCube
              setHoverData={setHoverData}
              setHoverDay={setHoverDay}
              data={data}
              key={i}
              index={i}
            >
              asd
            </MyPageCube>
          );
        })}
      </SCubeWrapper>
      <SCubeItem>
        {hoverDay}
        {hoverData.map(data => (
          <div>{data.date}</div>
        ))}
      </SCubeItem>
    </>
  );
};

export default MyPageActivity;

const SCubeWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 360px;

  & > div {
    width: 40px;
    height: 40px;
    background-color: ${props => props.theme.color.grey5};
    border: 2px solid ${props => props.theme.color.mainIvory};
  }

  /* &:first-child {
    transform: rotate(0deg) skew(0deg, 30deg);
  }

  &:nth-child(2) {
    transform: rotateX(180deg) skew(0deg, 30deg);
  }

  &:nth-child(3) {
    width: 91px;
    position: absolute;
    top: -77px;
    left: 45px;
    transform: rotate(120deg) skew(0deg, 30deg);

    & > div {
      width: 30.1px;
      height: 34.5px;
    } */
  /* } */
`;

const SCubeItem = styled.div`
  position: absolute;
  top: 0;
  left: -200px;
  z-index: 10;
`;
