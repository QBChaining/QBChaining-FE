import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
const MainPreView = ({}) => {
  const preView = useSelector(state => state.blogSlice.blogDetail);
  const ispreView = useSelector(state => state.blogSlice.isPreViwe);
  console.log(ispreView);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getBlogDetailDB());
  // }, []);

  return (
    <div>
      {ispreView ? (
        <SContainer>
          <div>
            <STitleNproFile>
              <STitle>{preView?.title}</STitle>
              {/* <SproFile url={preView?.profileImg} /> */}
            </STitleNproFile>
            <SConten>{preView?.content}</SConten>
          </div>
        </SContainer>
      ) : (
        <SContainer>
          <h1>오른쪽 리스트를 눌러보세요 미리보기가 가능합니다.</h1>
        </SContainer>
      )}
    </div>
  );
};
const SContainer = styled.div`
  flex: 1;
  min-width: 700px;
  margin-top: 15px;
`;
const STitleNproFile = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const SproFile = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  /* background-image: url(${props => props.url}); */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-right: 11px;
`;
const STitle = styled.div``;
const SConten = styled.div``;
export default MainPreView;
