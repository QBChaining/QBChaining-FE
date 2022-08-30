import instance from "../axios";

export const blogApi = {
  getBlogCommunityList: () => instance.get("/posts"),
  postBlogCommunityList: () => instance.post("posts"),
};
