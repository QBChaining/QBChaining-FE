import React, { useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear"; // 윤년 판단 플러그인
import "dayjs/locale/ko"; // 한국어 가져오기
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyPageCube = ({ data, index, setHoverDay, setHoverData }) => {
  const Today = dayjs(new Date());
  const day = Today.add(-index, "day").format("YYYY-MM-DD");
  // for (let i = 0; i < 27; i++) {
  //   const day = Today.add(-index, "day").format("YYYY-MM-DD");
  //

  console.log(day);
  return (
    <div
      style={{ position: "relative" }}
      onMouseOver={() => {
        setHoverDay(day);
        setHoverData(data);
      }}
      // onMouseOut={() => {
      //   setToggle(false);
      //   setHoverDay("");
      // }}
    ></div>
  );
};

export default MyPageCube;
