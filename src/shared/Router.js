import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./../pages/landing/Landing";
import MyPage from "./../pages/myPage/MyPage";
import QnaWrite from "./../pages/qna/QnaWrite";
import QnaMain from "./../pages/qna/QnaMain";
import BlogCommmunityMain from "./../pages/blog/BlogCommmunityMain";
import BlogPersonalMain from "./../pages/blog/BlogPersonalMain";

const router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/qna" element={<QnaMain />} />
      <Route path="/qna/write" element={<QnaWrite />} />
      <Route path="/blog" element={<BlogCommmunityMain />} />
      <Route path="/blog/:id" element={<BlogPersonalMain />} />
    </Routes>
  );
};

export default router;
