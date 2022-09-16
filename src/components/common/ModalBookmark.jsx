import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkStar from "../../assets/images/BookmarkStar.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getBookmarkListDB } from "../../redux/async/qna";
import { getBlogBookMarkDB } from "../../redux/async/blog";
import BookmarkListItem from "./../bookmark/BookmarkListItem";
import { needLoginAlert } from "./../../utils/swal";
import Nodata from "./../bookmark/Nodata";
import { useNavigate } from "react-router-dom";
const ModalBookmark = ({ isWrite, type }) => {
  const dispatch = useDispatch();
  const location = window.location.pathname;

  const qnaBookmarkList = useSelector(state => state.qnaSlice.bookmarkList);
  const blogBookmarkList = useSelector(state => state.blogSlice.blogBookMark);
  console.log(blogBookmarkList);

  const { isLogin, color } = useSelector(state => state.userSlice);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    if (!isLogin) {
      return needLoginAlert();
    }
    setModal(!modal);
  };

  useEffect(() => {
    if (isLogin) {
      dispatch(getBlogBookMarkDB());
      dispatch(getBookmarkListDB());
    }
  }, []);

  return (
    <>
      {modal && (
        <SModalBookmark>
          <SListWrapper color={color}>
            <SList className="blog">
              <SListTitle>블로그</SListTitle>
              <SUnorderedList>
                {blogBookmarkList.map(data => (
                  <BookmarkListItem
                    isModal={!isWrite}
                    key={data.id}
                    data={data}
                    type={"blog"}
                  />
                ))}
                {blogBookmarkList.length < 4 && <Nodata />}
              </SUnorderedList>
            </SList>
            <SList className="qna">
              <SListTitle>Q&A</SListTitle>
              <SUnorderedList>
                {qnaBookmarkList.map(data => (
                  <BookmarkListItem
                    isModal={!isWrite}
                    key={data.id}
                    data={data}
                    type={"qna"}
                  />
                ))}
                {qnaBookmarkList.length < 4 && <Nodata />}
              </SUnorderedList>
            </SList>
          </SListWrapper>
        </SModalBookmark>
      )}
      <SModalBookmarkIcon color={color} onClick={toggle} />
    </>
  );
};

export default ModalBookmark;

const SModalBookmarkIcon = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.theme.color[props.color]};
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
  position: ${props => (props.isWrite ? "relative" : "fixed")};
  top: 0;
  left: 0;
  width: 618px;
`;

const SListWrapper = styled.div`
  position: fixed;
  width: 618px;
  height: calc(100vh - 190px);
  bottom: 50px;
  right: 50px;
  background: ${props => props.theme.color[props.color]};
  border-radius: 25px;
  padding: 0 30px;
  box-shadow: -8px 14px 50px rgba(0, 0, 0, 0.15);
`;

const SList = styled.div`
  &.blog {
    padding-bottom: 10px;
  }
`;

const SUnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 250px;
  overflow: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SListTitle = styled.h2`
  margin: 30px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.color.white};
`;
