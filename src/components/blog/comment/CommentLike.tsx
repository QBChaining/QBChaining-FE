import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState, AppDispatch } from "redux/config/configStore";

//이미지
import addlike from "../../../assets/images/addLike.png";
import unlike from "../../../assets/images/unlike.png";

// 경고창
import { needLoginAlert } from "../../../utils/swal";
import { postCommentLikeDB, delCommentLikeDB } from "../../../redux/async/blog";

const CommentLike = ({
  comments,
  isLike,
}: {
  comments: any;
  isLike: boolean;
}) => {
  const [isOn, setIsOn] = useState(null);
  const { isLogin } = useSelector((state: RootState) => state.userSlice);
  const dispatch: AppDispatch = useDispatch();

  const likeOn = (id: number) => {
    if (!isLogin) {
      needLoginAlert();
      return;
    }
    dispatch(postCommentLikeDB(id));
    setIsOn(!isOn);
  };

  const likeOff = (id: number) => {
    dispatch(delCommentLikeDB(id));
    setIsOn(!isOn);
  };
  useEffect(() => {
    setIsOn(isLike);
  }, []);
  return (
    <SBlogLike>
      {isOn === true ? (
        <AddLike
          onClick={e => {
            likeOff(comments.id);
          }}
        />
      ) : (
        <UnLike
          onClick={e => {
            likeOn(comments.id);
          }}
        />
      )}
      {/* <SNum>{comments.like}</SNum> */}
    </SBlogLike>
  );
};

export default CommentLike;
const SBlogLike = styled.div`
  display: flex;
  align-items: center;
  color: #c0c0c0;
  line-height: 20px;
  cursor: pointer;
`;
const UnLike = styled.div`
  width: 13px;
  height: 13px;
  background-position: center;
  background-size: contain;
  background-image: url(${unlike});
  background-repeat: no-repeat;
`;

const AddLike = styled.div`
  width: 13px;
  height: 13px;

  background-position: center;
  background-size: contain;
  background-image: url(${addlike});
  background-repeat: no-repeat;
`;
// const SNum = styled.div`
//   position: absolute;
//   display: flex;
//   font-size: 10px;

//   right: 515px;
// `;
