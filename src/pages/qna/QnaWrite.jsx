import React, { useEffect, useState } from "react";
import Editor from "../../components/common/Editor";
import { useForm } from "react-hook-form";
import axios from "axios";

const QnaWrite = () => {
  const style = { height: "300px" };
  return (
    <>
      <Editor isWrite={true} style={style} />
    </>
  );
};

export default QnaWrite;
