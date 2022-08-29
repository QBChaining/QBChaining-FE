import {createAsyncThunk} from "@reduxjs/toolkit";
import {blogApi} from "../../axios/api/blogApi";
import {Swal} from "sweetalert2";
import {async} from "@firebase/util";

export const getBlogCommunityListDB = createAsyncThunk(
  "BLOG_COMMUNITYLIST",
  async (data, thunkAPI) => {
    try {
      const response = await blogApi.getBlogCommunityList();
      //   console.log("첫번째", response.statusText);
      if (response.statusText === "OK") {
        // console.log("두번째", response.data);
        return response.data;
      }
    } catch (err) {
      Swal.fir("에러", "네트워크 연결 상태를 확인해주세요.", "error");
      return thunkAPI.rejectWithValue(err.response.message);
    }
  }
);
