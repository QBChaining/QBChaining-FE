import React, { useState } from "react";
import WriteBookmark from "./WriteBookmark";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BookmarkFillIcon from "../../assets/images/BookmarkFillIcon.png";

const BookmarkListItem = ({ isModal, data }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const onToggleHandler = () => {
    setModal(!modal);
  };

  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };

  return (
    <>
      <SBookmarkListItem
        style={{}}
        onClick={
          isModal
            ? () => {
                goDetail("qna", data.qna_id);
              }
            : onToggleHandler
        }
      >
        <SUserName>dubyduba9898</SUserName>
        <STitle>{data.Qna?.title}</STitle>
        <SDate>2022.08.08</SDate>
      </SBookmarkListItem>
      {modal && (
        <WriteBookmark
          modal={modal}
          setModal={setModal}
          onToggleHandler={onToggleHandler}
          id={data.qna_id}
        />
      )}
    </>
  );
};

export default BookmarkListItem;

const SBookmarkListItem = styled.li`
  padding: 10px 40px 10px 54px;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: white;
  color: black;
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-image: url(${BookmarkFillIcon});
  background-repeat: no-repeat;
  background-position: left 30px top 17px;
  background-size: 14px;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const SUserName = styled.p`
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${props => props.theme.color.grey6};
`;

const STitle = styled.p`
  width: 200px;
  font-size: 16px;
  color: ${props => props.theme.color.black};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SDate = styled.p`
  color: ${props => props.theme.color.grey6};
`;
