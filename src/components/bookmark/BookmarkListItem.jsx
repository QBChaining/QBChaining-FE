import React, { useState } from "react";
import WriteBookmark from "./WriteBookmark";

const BookmarkListItem = data => {
  const [modal, setModal] = useState(false);

  const onToggleHandler = () => {
    setModal(!modal);
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
        onClick={onToggleHandler}
      >
        {data.data.Qna.title}
      </li>
      {modal && (
        <WriteBookmark
          modal={modal}
          setModal={setModal}
          onToggleHandler={onToggleHandler}
          id={data.data.qna_id}
        />
      )}
    </>
  );
};

export default BookmarkListItem;
