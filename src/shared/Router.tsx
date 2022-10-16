import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/configStore";
import Loading from "./../components/common/Loading";
const MyPage = lazy(() => import("../pages/myPage/MyPage"));
const QnaWrite = lazy(() => import("../pages/qna/QnaWrite"));
const QnaMain = lazy(() => import("../pages/qna/QnaMain"));
const Landing = lazy(() => import("../pages/landing/Landing"));
const BlogCommmunityMain = lazy(
  () => import("../pages/blog/BlogCommmunityMain"),
);
const BlogDetail = lazy(() => import("../pages/blog/BlogDetail"));
const QnaEdit = lazy(() => import("../pages/qna/QnaEdit"));
const QnaDetail = lazy(() => import("../pages/qna/QnaDetail"));
const Login = lazy(() => import("../pages/register/Login"));
const BlogWrite = lazy(() => import("../pages/blog/BlogCommunityWrite"));
const BlogEdit = lazy(() => import("../pages/blog/BlogCommentEdit"));
const NoLogin = lazy(() => import("../pages/NoLogin"));
const Search = lazy(() => import("../pages/search/Search"));
const Preparing = lazy(() => import("../pages/Preparing"));
const Undefind = lazy(() => import("../pages/Undefind"));
const RegisterEdit = lazy(() => import("../pages/register/RegisterEdit"));
const Register = lazy(() => import("./../pages/register/Register"));

const Router = () => {
  const { isLogin } = useSelector((state: RootState) => state.userSlice);

  return (
    <Suspense fallback={<Loading />}>
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
        <Route
          path="/qna/write"
          element={isLogin ? <QnaWrite /> : <NoLogin />}
        />
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
    </Suspense>
  );
};

export default Router;
