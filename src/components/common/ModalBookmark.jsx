import React, { useState } from "react";
import styled from "styled-components";
import BookmarkStar from "../../assets/images/BookmarkStar.png";
import BookmarkModal1 from "../../assets/images/BookmarkModal1.png";
const ModalBookmark = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  return (
    <>
      {modal && (
        <SModalBookmark>
          <div className="listWrapper"></div>
        </SModalBookmark>
      )}
      <SModalBookmarkIcon onClick={toggle} />
    </>
  );
};

export default ModalBookmark;

const SModalBookmarkIcon = styled.div`
  position: fixed;
  bottom: 44px;
  right: 66px;
  width: 50px;
  height: 50px;
  background: linear-gradient(128.19deg, #7c4b84 15.31%, #354160 84.65%);
  border-radius: 50%;
  cursor: pointer;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    background-image: url(${BookmarkStar});
    background-repeat: no-repeat;
    background-position: center center;
    display: block;
  }
`;

const SModalBookmark = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);

  & .listWrapper {
    position: fixed;
    bottom: 176px;
    right: 122px;
    width: 468px;
    height: 643px;
    background-color: #1c2030;

    &::before {
      content: "";
      position: absolute;
      bottom: 2px;
      right: 0;
      transform: translateY(100%);
      width: 67px;
      height: 42px;
      background-image: url(${BookmarkModal1});
      background-size: cover;
    }
  }
`;
