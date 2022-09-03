import React, { useEffect, useState } from "react";
import Editor from "../../components/common/Editor";
import { useForm } from "react-hook-form";
import axios from "axios";

const QnaWrite = () => {
  return (
    <>
      <Editor isWrite={true} />
    </>
  );
};

export default QnaWrite;
