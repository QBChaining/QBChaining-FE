import REACT, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogBookMarkDB } from "../../redux/async/blog";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
const BlogBookMarkList = () => {
  const bookMarkList = useSelector(state => state.blogSlice.blogBookMark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(bookMarkList);

  useEffect(() => {
    dispatch(getBlogBookMarkDB());
  }, []);
  return (
    <div>
      {bookMarkList?.map(markList => {
        return (
          <div key={markList.post_id}>
            <SBookMark
              onClick={() => {
                navigate(`/blog/detail/${markList.post_id}`);
              }}
            >
              {markList.Post?.title}
            </SBookMark>
          </div>
        );
      })}
    </div>
  );
};

const SBookMark = styled.div``;
export default BlogBookMarkList;
