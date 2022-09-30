// const [page, setPage] = useState(0);
// const [loading, setLoading] = useState(false);

// //추천게시글 불러오기
// const getRecommendedList = useCallback(() => {
//   const getRecommended = async () => {
//     await dispatch(getBlogCommunityListDB(page));
//     setLoading(false);
//   };
//   return getRecommended();
// }, [page, blogMainLists]);

// //스크롤 위치 계산하기
// const _scrollPosition = _.throttle(() => {
//   const scrollHeight = document.documentElement.scrollHeight;
//   const scrollTop = document.documentElement.scrollTop;
//   const clientHeight = document.documentElement.clientHeight;

//   if (scrollTop + clientHeight >= scrollHeight - 100 && loading === false) {
//     if (last) {
//       return;
//     }
//     setPage(page + 1);
//     getRecommendedList();
//     setLoading(true);
//   }
// }, 500);

// //페이지 계산해서 get 요청 보내고 page 카운트 올리기
// useEffect(() => {
//   if (page === 0 && rblogMainLists.length === 0) {
//     dispatch(__getBlogCommunityListDB(page));
//     setPage(page + 1);
//   }
//   if (blogMainLists.length !== 0) {
//     setPage(blogMainLists.length);
//   }
// }, []);

// //윈도우 스크롤 위치 계산하기
// useEffect(() => {
//   if (loading) {
//     return;
//   }
//   window.addEventListener("scroll", _scrollPosition);
//   return () => {
//     window.removeEventListener("scroll", _scrollPosition);
//   };
// }, [page, loading]);
