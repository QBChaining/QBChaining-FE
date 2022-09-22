import React, { useEffect } from "react";
import styled from "styled-components";
import ToastViewer from "./../editor/ToastViewer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import QnaCommentList from "./QnaCommentList";
import { produceWithPatches } from "immer";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const QnaPreview = () => {
  const navigate = useNavigate();
  const { qnaTarget: target, isDetailFetcing } = useSelector(
    state => state.qnaSlice,
  );

  const goDetail = id => {
    navigate(`/qna/detail/${id}`);
  };

  return (
    <SPreviewContainer>
      {Object.keys(target).length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          오른쪽 리스트를 눌러 미리보기를 확인하세요!
        </div>
      ) : !isDetailFetcing ? (
        <>
          <SUserInfo>
            <SUserInfoWrapper>
              <SProfile profile={target.profileImg} />
              <SUserInfoText>
                <SUserName>{target.userName}</SUserName>
                <SCreateAt>
                  {target.createdAt?.slice(0, 10)} /{" "}
                  {target.createdAt?.slice(11, 16)}
                </SCreateAt>
              </SUserInfoText>
              <SGoDetail
                onClick={() => {
                  goDetail(target.id);
                }}
              >
                자세히보기
              </SGoDetail>
            </SUserInfoWrapper>
          </SUserInfo>
          <SPreviewContent>
            <ToastViewer content={target.content} />
          </SPreviewContent>
          <QnaCommentList
            isPreview={true}
            author={target.user?.userName}
            resolve={target.isResolve}
            id={target.id}
            qnaId={target.id}
          />
        </>
      ) : (
        <SLoading>
          <ClipLoader />
        </SLoading>
      )}
    </SPreviewContainer>
  );
};

export default QnaPreview;

const SPreviewContainer = styled.div`
  margin-top: 86px;
  max-width: 735px;
  width: 100%;
  height: 80vh;
  position: sticky;
  top: 100px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: auto;
`;

const SUserInfoWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;
const SPreviewContent = styled.div`
  min-height: 100px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
`;

const SUserInfo = styled.div`
  display: flex;
  padding-bottom: 20px;
  align-items: center;
`;

const SProfile = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${props => props.profile});
  background-size: cover;
  border-radius: 50%;
  background-repeat: no-repeat;
  margin-right: 11px;
`;

const SUserInfoText = styled.div`
  margin-left: 10px;
`;

const SGoDetail = styled.div`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: ${props => props.theme.color.grey5};
  &:hover {
    color: ${props => props.theme.color.mainGreen};
  }
`;

const SUserName = styled.div`
  margin-right: 10px;
`;

const SCreateAt = styled.div`
  color: ${props => props.theme.color.grey6};
`;

const SLoading = styled.div`
  min-height: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
