import React from "react";
import styled from "styled-components";

//이미지
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";

const Nodata = ({ type }: { type?: string }) => {
  return (
    <SNodata>
      <SIcon src={BookmarkFillIcon} />
      <SText>즐겨찾기를 추가해주세요.</SText>
    </SNodata>
  );
};

export default Nodata;

const SNodata = styled.div`
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${props => props.theme.color.white};
  color: ${props => props.theme.color.black};
  border-radius: 30px;
`;

const SIcon = styled.img``;

const SText = styled.p`
  padding-top: 8px;
`;
