import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCommentListDB, getOneQnaListDB } from "../../redux/async/qna";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ToastViewer from "../editor/ToastViewer";
import QnaLike from "../../assets/images/QnaLike.png";
import GobackArrow from "../../assets/images/GobackArrow.png";
import { getBlogCommentListDB, getBlogDetailDB } from "../../redux/async/blog";

const WriteBookmark = ({ type, id, onToggleHandler }) => {
  const dispatch = useDispatch();
  const { color } = useSelector(state => state.userSlice);

  const target = useSelector(state =>
    type === "qna" ? state.qnaSlice.qnaTarget : state.blogSlice.blogDetail,
  );

  const commentList = useSelector(state =>
    type === "qna" ? state.qnaSlice.commentList : state.blogSlice.commentList,
  );

  useEffect(() => {
    dispatch(type === "qna" ? getOneQnaListDB(id) : getBlogDetailDB(id));
    dispatch(type === "qna" ? getCommentListDB(id) : getBlogCommentListDB(id));
  }, []);

  return (
    <SWriteBookmark color={color}>
      <SWriteBookmarkWrapper>
        <SBackButton color={color} onClick={onToggleHandler}>
          돌아가기
        </SBackButton>
        <SUserInfo>
          <SUserProfile profile={target.profile_img} />
          <SUserInfoText>
            <SUserName>{target.user_name}</SUserName>
            <SCreateAt>{target.createdAt}</SCreateAt>
          </SUserInfoText>
        </SUserInfo>
        <SContent>
          <SContentTitle>{target.title}</SContentTitle>
          <SContentText>
            <ToastViewer content={target.content} />
          </SContentText>
          <SSubinfo>
            <STags>
              {target.tags?.map((data, i) => {
                return (
                  <STag color={color} key={i}>
                    {data}
                  </STag>
                );
              })}
            </STags>
            <SHoneyTip>{target.honey_tip}</SHoneyTip>
          </SSubinfo>
        </SContent>
        <SCommentWrapper>
          {commentList.map(data => (
            <SComment key={data.id}>
              <SUserInfo>
                {type === "qna" ? (
                  <SUserProfile profile={data.profile_img} />
                ) : (
                  <SUserProfile profile={data.User?.profile_img} />
                )}
                <SUserInfoText>
                  <SUserName>{target.user_name}</SUserName>
                </SUserInfoText>
              </SUserInfo>
              <ToastViewer content={data.comment} />
            </SComment>
          ))}
        </SCommentWrapper>
      </SWriteBookmarkWrapper>
    </SWriteBookmark>
  );
};

export default WriteBookmark;

const SWriteBookmark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.color[props.color]};
  overflow: auto;
  padding: 30px;
  border-radius: 30px;
`;

const SWriteBookmarkWrapper = styled.div`
  position: relative;
  background-color: ${props => props.theme.color.white};
  height: 100%;
  border-radius: 30px;
  padding: 20px;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SBackButton = styled.button`
  position: fixed;
  top: 190px;
  right: 100px;
  border: none;
  border-radius: 30px;
  padding: 10px 40px 10px 20px;
  background-color: ${props => props.theme.color[props.color]};
  color: ${props => props.theme.color.white};
  background-image: url(${GobackArrow});
  background-repeat: no-repeat;
  background-position: right 15px top 11px;
  font-weight: 600;
  background-size: 20px 20px;
`;

const SUserProfile = styled.div`
  width: 44px;
  height: 44px;
  background-image: url(${props => props.profile});
  background-size: cover;
  border-radius: 50%;
`;

const SUserInfoText = styled.div`
  margin-left: 10px;
`;
const SUserName = styled.div`
  margin-bottom: 2px;
`;
const SCreateAt = styled.div`
  color: ${props => props.theme.color.grey6};
`;

const SContent = styled.div`
  padding-bottom: 9px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
  word-wrap: break-word;
`;
const SContentTitle = styled.p`
  font-size: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${props => props.theme.color.grey5};
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SContentText = styled.div`
  padding-top: 20px;
  margin-bottom: 20px;
  min-height: 100px;
`;

const SSubinfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const STags = styled.div`
  display: flex;
`;

const STag = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  margin: 0 11px 11px 0;
  border: 1px solid ${props => props.theme.color[props.color]};
  color: ${props => props.theme.color[props.color]};
  border-radius: 30px;
`;

const SHoneyTip = styled.div`
  font-size: 18px;
  height: 100%;
  color: ${props => props.theme.color.grey6};
  padding-right: 17px;
  background-image: url(${QnaLike});
  background-repeat: no-repeat;
  background-position: right 0px top 9px;
  background-size: 12px;
`;

const SCommentWrapper = styled.div``;

const SComment = styled.div`
  border-bottom: 1px solid ${props => props.theme.color.grey6};
  padding: 20px 0;
  &:last-child {
    border-bottom: none;
  }
`;
