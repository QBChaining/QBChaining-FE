import React, { useState } from "react";
import WriteBookmark from "./WriteBookmark";
import { useNavigate } from "react-router-dom";

const BookmarkListItem = ({ isModal, data }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const onToggleHandler = () => {
    setModal(!modal);
  };

  const goDetail = (content, id) => {
    navigate(`/${content}/detail/${id}`);
  };

  return (
    <>
      <li
        style={{
          padding: "20px",
          border: "1px solid black",
          margin: "10px",
          cursor: "pointer",
          backgroundColor: "white",
          color: "black",
        }}
        onClick={
          isModal
            ? () => {
                goDetail("qna", data.qna_id);
              }
            : onToggleHandler
        }
      >
        {data.Qna.title}
      </li>
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
