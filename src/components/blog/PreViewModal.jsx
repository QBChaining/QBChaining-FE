import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
const PreViewModal = ({ data }) => {
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     dispatch(getBlogDetailDB(data));
  //   }, [dispatch]);

  return (
    <div>
      <SContainer>
        <div>
          <button>미리보기</button>
        </div>
      </SContainer>
    </div>
  );
};
const SContainer = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: lightgray;
  margin-top: 15px;
  .button {
    width: 50px;
    height: 50px;
  }
`;
const STitle = styled.div``;
const SConten = styled.div``;
export default PreViewModal;
