import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./../pages/landing/Landing";
import MyPage from "./../pages/myPage/MyPage";
import QnaWrite from "./../pages/qna/QnaWrite";
import QnaMain from "./../pages/qna/QnaMain";
import BlogCommmunityMain from "./../pages/blog/BlogCommmunityMain";
import BlogPersonalMain from "./../pages/blog/BlogPersonalMain";
import QnaEdit from "./../pages/qna/QnaEdit";
import QnaDetail from "./../pages/qna/QnaDetail";
import Register from "./../pages/register/Register";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/qna" element={<QnaMain />} />
      <Route path="/qna/write" element={<QnaWrite />} />
      <Route path="/qna/detail/:id" element={<QnaDetail />} />
      <Route path="/qna/edit/:id" element={<QnaEdit />} />
      <Route path="/blog" element={<BlogCommmunityMain />} />
      <Route path="/blog/:id" element={<BlogPersonalMain />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default router;
