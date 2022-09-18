import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
const MainPreView = ({ data }) => {
  const preView = useSelector(state => state);

  //
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogDetailDB(data));
  }, []);

  return (
    <div>
      <SContainer>
        {/* <div>
          <STitle>{data.title}</STitle>
          <SConten>{data.content}</SConten>
        </div> */}
      </SContainer>
    </div>
  );
};
const SContainer = styled.div`
  flex: 1;
  min-width: 700px;
  background-color: lightgray;
  margin-top: 15px;
`;
const STitle = styled.div``;
const SConten = styled.div``;
export default MainPreView;
