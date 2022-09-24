import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Cube = ({ data, setHoverDay }) => {
  return (
    <div
      style={{ position: "relative" }}
      onMouseOver={() => {
        // setHoverDay(data);
      }}
      // onMouseOut={() => {
      //   setToggle(false);
      //   setHoverDay("");
      // }}
    ></div>
  );
};

const MyPageActivity = () => {
  dayjs.locale("ko");

  const { userActivity } = useSelector(state => state.userSlice);

  const [week1, setWeek1] = useState([]);
  const [week2, setWeek2] = useState([]);
  const [week3, setWeek3] = useState([]);
  const [hoverDay, setHoverDay] = useState("");

  const Today = dayjs(new Date());

  //큐브만들기 반복문
  useEffect(() => {
    for (let i = 0; i < 27; i++) {
      const day = [Today.add(-i, "day").format("YYYY-MM-DD")];
      if (i < 9) {
        setWeek1(prev => prev.concat([day]));
      } else if ((9 <= i, i < 18)) {
        setWeek2(prev => prev.concat([day]));
      } else if ((18 <= i, i < 27)) {
        setWeek3(prev => prev.concat([day]));
      }
    }
  }, []);

  useEffect(() => {
    console.log(userActivity);
    // userActivity.map(data => {
    //   data.map(data2 => {
    //     setWeek1(prev =>
    //       prev.map((data3, i) => {
    //         if (data3[0] == data2.date) {
    //         }
    //         return [...data3, data2];
    //       }),
    //     );
    //   });
    // });
  }, [userActivity]);

  console.log();

  return (
    <>
      <SCubeWrapper>
        {week1.map((data, i) => (
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
      </SCubeWrapper>
      <SCubeItem>{hoverDay}</SCubeItem>
    </>
  );
};

export default MyPageActivity;

const SCubeWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 90px;

  & > div {
    width: 30px;
    height: 30px;
    background-color: ${props => props.theme.color.grey5};
    border: 2px solid white;
  }

  &:first-child {
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
    }
  }
`;

const SCubeItem = styled.div`
  position: absolute;
  top: 0;
  left: -200px;
  z-index: 10;
`;
