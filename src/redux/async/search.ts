import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchApi } from "../../axios/api/searchApi";

import { networkError, successAlert } from "../../utils/swal";

import * as Sentry from "@sentry/react";

type SSearchData = {
  word: string;
  endid: number;
};

//qna 검색결과 조회
export const getQnaSearchListDB = createAsyncThunk(
  "qna/getqnasearch",

  async (data: SSearchData, thunkAPI) => {
    try {
      const response = await searchApi.getQnaSearchList(data);
      if (
        response.data.success === true &&
        response.data.data !== "검색 결과가 없습니다."
      ) {
        return response.data.data;
      } else if (
        response.data.success === true &&
        response.data.data === "검색 결과가 없습니다."
      ) {
        return [];
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, QNA게시글 검색결과 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);

export const getBlogSearchListDB = createAsyncThunk(
  "blog/getqnasearch",
  async (data: SSearchData, thunkAPI) => {
    try {
      const response = await searchApi.getBlogSearchList(data);
      if (
        response.data.success === true &&
        response.data.data !== "검색 결과가 없습니다."
      ) {
        return response.data.data;
      } else if (
        response.data.success === true &&
        response.data.data === "검색 결과가 없습니다."
      ) {
        return [];
      }
    } catch (err: any) {
      if (err.response.status === 404) {
        networkError();
      }
      Sentry.captureException(`error, QNA게시글 검색결과 조회 : ${err}`);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
