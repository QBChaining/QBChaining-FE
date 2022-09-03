import React, { useEffect, useState } from "react";
import Editor from "../../components/common/Editor";
import { useForm } from "react-hook-form";
import axios from "axios";
import BookmarkList from "./../../components/common/BookmarkList";

const QnaWrite = () => {
  return (
    <>
      <Editor isWrite={true} />
      <BookmarkList />
    </>
  );
};

export default QnaWrite;
