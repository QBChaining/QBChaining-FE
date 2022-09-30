import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//슬라이드
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//통신
import { getHotBlogDB } from "../../redux/async/blog";
import { getQnaHotListDB } from "./../../redux/async/qna";

//이미지
import QnaMainillust from "../../assets/images/QnaMainillust.png";
import HotQna from "../../assets/images/Hotqna.png";
import BlogMainillust from "../../assets/images/BlogMainillust.png";
import Hotblog from "../../assets/images/Hotblog.png";
import Fire from "../../assets/images/Fire.png";
import Like from "../../assets/images/unlike.png";
import BugReport from "../../assets/images/BugReport.jpg";
import SurveyReport from "../../assets/images/SurveyReport.jpg";

const SideBanner = ({ type }) => {
  const navigate = useNavigate();
  const hotList = useSelector(state =>
    type === "qna" ? state.qnaSlice.qnaHotList : state.blogSlice.hotBlog,
  );

  const dispatch = useDispatch();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
  };

  useEffect(() => {
    dispatch(type === "qna" ? getQnaHotListDB() : getHotBlogDB());
  }, []);

  const goDetail = (type, id) => {
    navigate(`/${type}/detail/${id}`);
  };
  return (
    <SBannerWrapper type={type}>
      <SHotContent>
        <SHotHeader>
          <SFireIcon />
          {type === "qna"
            ? "최근에 추천 많이 받은 질문"
            : "최근에 추천 많이 받은 게시글"}
        </SHotHeader>
        <SHotList>
          {hotList.map(hot => (
            <li
              key={hot.id}
              onClick={() => {
                goDetail(type, hot.id);
              }}
            >
              <SListTitle>{hot.title}</SListTitle>
              <SLike>{hot.like}</SLike>
            </li>
          ))}
        </SHotList>
      </SHotContent>
      <SBanner>
        <Slider {...settings}>
          <img
            onClick={() => {
              window.open("https://forms.gle/dJkEaE5APAW7Wixx9", "_blank");
            }}
            src={BugReport}
            alt={"BugReport"}
          ></img>
          <img
            onClick={() => {
              window.open("https://forms.gle/wbxoBSTM8mZDh3LK6", "_blank");
            }}
            src={SurveyReport}
            alt={"SurveyReport"}
          ></img>
        </Slider>
      </SBanner>
    </SBannerWrapper>
  );
};

export default SideBanner;

const SBannerWrapper = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -156px;
    right: 0;
    width: 197px;
    height: 156px;
    background-image: url(${props =>
      props.type === "qna" ? QnaMainillust : BlogMainillust});
  }
  &::after {
    content: "";
    position: absolute;
    top: -52px;
    left: 20px;
    width: 244px;
    height: 42px;
    background-repeat: no-repeat;
    background-image: url(${props =>
      props.type === "qna" ? HotQna : Hotblog});
  }
  max-width: 400px;
  min-width: 320px;
  height: 490px;
  position: sticky;
  top: 320px;
`;

const SHotContent = styled.div`
  width: 100%;
  height: 260px;
  margin-bottom: 30px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
`;

const SBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;

  & .slick-slider {
    height: 100%;
  }

  & .slick-list {
    height: 100%;
  }

  & .slick-track {
    height: 100%;
  }

  & .slick-slide {
    cursor: pointer;
    height: 100%;
  }

  & div {
    height: 100%;
  }

  & img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const SHotHeader = styled.div`
  background-color: ${props => props.theme.color.mainNavy};
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.color.white};
  font-weight: 600;
  font-size: 22px;
`;

const SFireIcon = styled.div`
  width: 27px;
  height: 27px;
  margin-right: 6px;
  background-image: url(${Fire});
  background-repeat: no-repeat;
  background-position: center;
`;

const SHotList = styled.div`
  padding: 15px 40px;

  & li {
    border-bottom: 1px solid #dcdcdc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    color: #c0c0c0;

    &:hover {
      color: black;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

const SListTitle = styled.div`
  padding: 10px 0;
  padding-right: 10px;
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SLike = styled.div`
  display: flex;
  align-items: center;
  color: #9c9c9c;
  font-weight: 500;

  &::after {
    content: "";
    width: 15px;
    height: 13px;
    background-image: url(${Like});
    background-repeat: no-repeat;
    background-size: contain;
    padding-left: 6px;
    background-position: center right;
  }
`;
