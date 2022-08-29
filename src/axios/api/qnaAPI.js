import instance from "../axios";

export const qnaApi = {
  getList: () => instance.get("/boards"),
  // getOneList: (id) => instance.get(`/boards/${id}`),
  getOneList: (id) => instance.get(`/boards?id=${id}`),
  postList: (data) => instance.post("/boards", data),
  // editList: (data) => instance.put(`/boards/${data.id}`),
  editList: (data) => instance.put(`/boards/${data.id}`, data),
};
