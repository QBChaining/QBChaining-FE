import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/configStore";
import Landing from "../pages/landing/Landing";
import MyPage from "../pages/myPage/MyPage";
import QnaWrite from "../pages/qna/QnaWrite";
import QnaMain from "../pages/qna/QnaMain";
import BlogCommmunityMain from "../pages/blog/BlogCommmunityMain";
import BlogDetail from "../pages/blog/BlogDetail";
import QnaEdit from "../pages/qna/QnaEdit";
import QnaDetail from "../pages/qna/QnaDetail";
import Login from "../pages/register/Login";
import BlogWrite from "../pages/blog/BlogCommunityWrite";
import BlogEdit from "../pages/blog/BlogCommentEdit";
import NoLogin from "../pages/NoLogin";
import Search from "../pages/search/Search";
import Preparing from "../pages/Preparing";
import Undefind from "../pages/Undefind";
import RegisterEdit from "../pages/register/RegisterEdit";
import Register from "./../pages/register/Register";

const Router = () => {
  const { isLogin } = useSelector((state: RootState) => state.userSlice);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/*" element={<Undefind />} />
      <Route path="/search" element={<Search />} />
      <Route
        path="/register"
        element={
          isLogin ? <Register isEdit={false} editData={{}} /> : <NoLogin />
        }
      />
      <Route
        path="/register/edit"
        element={isLogin ? <RegisterEdit /> : <NoLogin />}
      />
      <Route path="/ranking" element={<Preparing />} />
      <Route path="/mypage/:userName" element={<MyPage />} />
      <Route path="/qna" element={<QnaMain />} />
      <Route path="/qna/write" element={isLogin ? <QnaWrite /> : <NoLogin />} />
      <Route path="/qna/detail/:id" element={<QnaDetail />} />
      <Route
        path="/qna/edit/:id"
        element={isLogin ? <QnaEdit /> : <NoLogin />}
      />
      <Route
        path="/blog/edit/:id"
        element={isLogin ? <BlogEdit /> : <NoLogin />}
      />
      <Route
        path="/blog/write"
        element={isLogin ? <BlogWrite /> : <NoLogin />}
      />
      <Route path="/blog" element={<BlogCommmunityMain />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog/detail/:id" element={<BlogDetail />} />
    </Routes>
  );
};

export default Router;
