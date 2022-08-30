import {createAsyncThunk} from "@reduxjs/toolkit";
import {blogApi} from "../../axios/api/blogApi";
import {Swal} from "sweetalert2";

export const getBlogCommunityListDB = createAsyncThunk(
  "BLOG_COMMUNITYLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getBlogCommunityList();
      if (response.statusText === "OK") {
        return response.data;
      }
    } catch (err) {
      Swal.fir("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);
