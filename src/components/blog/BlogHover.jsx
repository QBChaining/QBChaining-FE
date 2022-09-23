import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getBlogDetailDB } from "../../redux/async/blog";
import { useNavigate } from "react-router-dom";
import arrowleft from "../../assets/images/arrowleft.png";
import arrowright from "../../assets/images/arrowright.png";
const BlogHover = ({ posts }) => {
  const { blogDetail, isPreView } = useSelector(state => state.blogSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickBlogDetailLink = () => {
    navigate(`/blog/detail/${posts.id}`);
  };
  const onClickView = () => {
    dispatch(getBlogDetailDB(posts.id));
  };
  return (
    <SHover>
      <SLeftHover
        onClick={() => {
          onClickView(posts.id);
        }}
      ></SLeftHover>
      <SRightHover onClick={onClickBlogDetailLink}></SRightHover>
    </SHover>
  );
};
const SHover = styled.div`
  width: 100%;
  /* min-width: 650px; */
  /* height: 300px; */

  /* background-color: orange; */
  position: absolute;
  /* top: 100px; */
  /* height: 100px; */
  display: flex;
  flex-direction: row;
  opacity: 0.1;
  bottom: 0;
  left: 0px;
  top: 0px;
`;
const SLeftHover = styled.div`
  width: 100%;
  min-width: 350px;
  height: 100%;
  position: relative;
  /* border-radius: 30px; */
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  &:hover {
    background-color: rgba(20, 20, 20, 0.5);
  }
  &:hover::after {
    content: "";
    display: block;
    position: absolute;
    width: 70px;
    height: 70px;
    background-image: url(${arrowleft});
    background-size: cover;
    color: black;
    top: 30%;
    left: 40%;
  }
`;

const SRightHover = styled.div`
  width: 100%;
  height: 100%;
  min-width: 350px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;

  &:hover {
    background-color: rgba(20, 20, 20, 0.5);
  }
  &:hover::after {
    content: "";
    display: block;
    position: absolute;
    width: 70px;
    height: 70px;
    background-image: url(${arrowright});
    background-size: cover;
    top: 30%;
    right: 22%;
  }
`;
export default BlogHover;
