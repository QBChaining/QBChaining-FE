import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MyPageCube from "./MyPageCube";
import { RootState, AppDispatch } from "redux/config/configStore";

const MyPageActivity = () => {
  const { userActivity } = useSelector((state: RootState) => state.userSlice);
  const [cube, setCube] = useState([]);
  const [hoverDay, setHoverDay] = useState("");
  const [hoverData, setHoverData] = useState([]);

  useEffect(() => {
    setCube(userActivity);
  }, [userActivity]);

  return (
    <>
      <STitle>나만의 큐브를 채워보세요!</STitle>
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
    </>
  );
};

export default MyPageActivity;

const SCubeWrapper = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  max-width: 675px;

  & > div {
    width: 45px;
    height: 45px;
    border: 5px solid ${props => props.theme.color.mainIvory};
  }
`;

const STitle = styled.div``;
