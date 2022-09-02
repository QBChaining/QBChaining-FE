import React from "react";
import styled from "styled-components";
const Tag = () => {
  const tagRef = React.useRef();
  const [tags, setTags] = React.useState([
    {
      id: 1,
      tag: "JAVA",
    },
    {
      id: 2,
      tag: "REACT",
    },
    {
      id: 3,
      tag: "JAVA SCRIPT",
    },
  ]);

  //태그 추가 버튼
  const onClickTag = () => {
    setTags([...tags, { id: 1, tag: tagRef.current.value }]);
  };

  React.useEffect(() => {
    onClickTag();
  }, []);
  return (
    <div>
      <input text="text" ref={tagRef} />
      <button
        onClick={() => {
          onClickTag();
        }}
      >
        태그추가
      </button>
      <div>
        {tags.map(tags => {
          return (
            <div key={tags.id}>
              <button>{tags.tag}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tag;
