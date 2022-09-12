import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkStar from "../../assets/images/BookmarkStar.png";
import BookmarkModal1 from "../../assets/images/BookmarkModal1.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBookmarkListDB } from "../../redux/async/qna";
import BookmarkListItem from "./../bookmark/BookmarkListItem";
import { needLoginAlert } from "./../../utils/swal";
const ModalBookmark = ({ isWrite }) => {
  const dispatch = useDispatch();
  const qnaBookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const { isLogin } = useSelector(state => state.userSlice);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (!isLogin) {
      return needLoginAlert();
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getBookmarkListDB());
    }
  }, []);
  return (
    <>
      {modal && (
        <SModalBookmark>
          <div className="listWrapper">
            <div className="blog">
              <h2>블로그</h2>
            </div>
            <div className="qna">
              <h2>Q&A</h2>
              <ul>
                {qnaBookmarkList.map(data => (
                  <BookmarkListItem
                    isModal={true}
                    key={data.qna_id}
                    data={data}
                  />
                ))}
              </ul>
            </div>
          </div>
        </SModalBookmark>
      )}
      <SModalBookmarkIcon onClick={toggle} />
    </>
  );
};

export default ModalBookmark;

const SModalBookmarkIcon = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 44px;
  right: 66px;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.color.backgroundGradient};
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
    color: white;

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
