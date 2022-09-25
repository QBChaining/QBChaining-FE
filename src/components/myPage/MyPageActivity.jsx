import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MyPageCube from "./MyPageCube";

const MyPageActivity = () => {
  const { userActivity } = useSelector(state => state.userSlice);
  const [cube, setCube] = useState([]);
  const [hoverDay, setHoverDay] = useState("");
  const [hoverData, setHoverData] = useState([]);

  useEffect(() => {
    setCube(userActivity);
  }, [userActivity]);

  console.log(userActivity);

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
        {cube.map((data, i) => (
          <MyPageCube
            hoverData={hoverData}
            setHoverData={setHoverData}
            hoverDay={hoverDay}
            setHoverDay={setHoverDay}
            data={data}
            length={data.length}
            key={i}
            index={i}
          />
        ))}
      </SCubeWrapper>
      {/* <SCubeItem>
        {hoverData.map((data, i) => (
          <div key={i}>
            {data.post && <div>블로그{data.post}</div>}
            {data.postComment && <div>블로그 댓글{data.postComment}</div>}
            {data.qna && <div>Q&A{data.qna}</div>}
            {data.qnaComment && <div>Q&A 댓글{data.qnaComment}</div>}
          </div>
        ))}
      </SCubeItem> */}
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
  left: -230px;
  z-index: 10;
  height: 200px;
  padding: 20px;
  overflow: auto;
  & > div {
    padding: 5px;
  }
`;

const SChartContainer = styled.div`
  position: absolute;
  top: -200px;
  right: -230px;
`;
const ChartWrapper = styled.div``;

const SActiveData = styled.div`
  position: absolute;
  top: 100px;
`;
