import React from "react";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <SLoading>
      <ClipLoader />
    </SLoading>
  );
};

export default Loading;

const SLoading = styled.div`
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
