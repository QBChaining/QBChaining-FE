import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import ToastViewer from "../editor/ToastViewer";
import NotifiTest from "../common/NotifiTest";
const MainPreView = ({}) => {
  const { blogDetail, isPreView } = useSelector(state => state.blogSlice);

  return (
    <div>
      {isPreView ? (
        <SContainer>
          <div>
            <STitleNproFile>
              <NotifiTest />

              <STitle>{blogDetail?.title}</STitle>
              {/* <SproFile url={preView?.profileImg} /> */}
            </STitleNproFile>
            <ToastViewer content={blogDetail?.content} />
          </div>
        </SContainer>
      ) : (
        <SContainer>
          <HelperText>
            <NotifiTest />

            <div>오른쪽 리스트를 눌러보세요 미리보기가 가능합니다.</div>
          </HelperText>
        </SContainer>
      )}
    </div>
  );
};
const SContainer = styled.div`
  flex: 1;
  max-width: 700px;
  margin-top: 15px;
  .div {
    height: 300px;
  }
`;
const HelperText = styled.div`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 200px;
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
const STitle = styled.div`
  font-size: 30px;
`;
const SConten = styled.div`
  font-size: 20px;
`;
export default MainPreView;
