import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
//유틸 카테고리
import categories from "../../utils/category";
// firebase storage
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//로딩이미지
import loadingImage from "../../assets/images/Loading_icon.gif";
import selectArrow from "../../assets/images/SelectArrow.png";
//quill
import Quill from "quill";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";
//코드블럭 구문강조 highlight.js
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import Swal from "sweetalert2";
import {
  patchBlogCommunityDB,
  postBlogCommunityDB,
} from "../../redux/async/blog";

import {
  editQnaListDB,
  postCommentListDB,
  postQnaListDB,
} from "../../redux/async/qna";

//이미지 리사이즈 레지스터
Quill.register("modules/ImageResize", ImageResize);
const Editor = ({
  isEdit,
  isWrite,
  isCommentWrite,
  blogEdit,
  blogWrite,
  //블로그 포스트아이디
  postId,
  blogCommnuityEdit,
  editData,
  id,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagText = useRef();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Javascript");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const placeholder = "입력해주세요";
  const theme = "snow";

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],
    ["image"],
  ];
  const modules = {
    toolbar: toolbarOptions,
    ImageResize: {
      modules: ["Resize"],
    },
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
  };
  const formats = [
    "bold",
    "blockquote",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "header",
    "size",
    "link",
    "image",
    "color",
    "background",
    "code-block",
  ];
  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      //현재 커서의 위치 저장
      const range = quill.getSelection(true);
      //업로드중 로딩이미지 삽입
      quill.insertEmbed(range.index, "image", loadingImage);
      try {
        //firebase에 이미지 업로드
        const uploaded_file = await uploadBytes(
          ref(storage, `images/${Date.now()}`),
          file,
        );

        //firebase에 올라간 이미지url 저장
        const file_url = await getDownloadURL(uploaded_file.ref);

        //로딩중 이미지 삭제
        quill.deleteText(range.index, 1);

        //firebase에 이미지 업로드 완료 후 url 추출후 textEditor에 삽입
        quill.insertEmbed(range.index, "image", file_url);

        //유저 편의를 위해 커서를 이미지 오른쪽에 위치
        quill.setSelection(range.index + 1);
      } catch (error) {
        //이미지 업로드 실패시 로딩이미지 삭제
        quill.deleteText(range.index, 1);
      }
    };
  };

  //quill에 image기능 추가
  useEffect(() => {
    if (quill) {
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill]);

  //toolbar 오류로 2개생길때 한개 삭제
  if (quillRef.current?.parentNode?.childNodes.length > 2) {
    quillRef.current.parentNode.removeChild(
      quillRef.current.parentNode.childNodes[1],
    );
  }

  //생성 or 수정 함수
  const onSubmitHandler = e => {
    e.preventDefault();
    if (quill.getText().length < 2) {
      Swal.fire("입력해주세요", "", "error");
      return;
    }
    //수정중이라면
    if (isEdit) {
      dispatch(
        editQnaListDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
          id: editData.id,
          category: category,
          tag: tags,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //생성중이라면
    } else if (isWrite) {
      dispatch(
        postQnaListDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
          category: category,
          tag: tags,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //코멘트작성
    } else if (isCommentWrite) {
      dispatch(
        postCommentListDB({
          content: quillRef.current.firstChild.innerHTML,
          id: parseInt(id),
        }),
      );
      //블로그 수정, 생성 수정중
    } else if (blogWrite) {
      navigate("/blog");
      dispatch(
        postBlogCommunityDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
          tag,
        }),
      );
    }
  };

  //titlechangehandler
  const onTitleChangeHandler = e => {
    setTitle(e.target.value);
  };

  //edit상황이라면 타이틀, content 가져오기
  useEffect(() => {
    if (isEdit) {
      setTitle(editData.title);
      setCategory(editData.category);
      quillRef.current.firstChild.innerHTML = editData.content;
    }
  }, [isEdit, editData]);

  const onCategoryChangeHandler = e => {
    setCategory(e.target.value);
  };

  //태그입력
  const onChangeTagHandler = e => {
    setTag(e.target.value);
  };

  //태그추가
  const onAddTagHandler = () => {
    if (tagText.current.value.length < 1) {
      alert("입력부탁드려요~");
      return;
    }
    setTags([...tags, tag]);
    setTag("");
    tagText.current.value = "";
  };

  return (
    <Sform>
      <div>
        {(isEdit || isWrite || blogWrite) && (
          <div className="titleWrapper">
            <input
              id="title"
              value={title || ""}
              onChange={onTitleChangeHandler}
              type="text"
              placeholder="제목을 입력해주세요."
            />
            {(isEdit || isWrite) && (
              <Select
                onChange={onCategoryChangeHandler}
                defaultValue={category}
                value={isEdit && category}
                name="category"
                id="category"
                required
                arrow={selectArrow}
              >
                <option disabled hidden value="카테고리를 선택해 주세요">
                  카테고리를 선택해 주세요
                </option>
                {categories.qnaCategory.map(data => (
                  <option key={data.langId} value={data.langName}>
                    {data.langName}
                  </option>
                ))}
              </Select>
            )}
          </div>
        )}
        <SEditor>
          <div ref={quillRef} />
        </SEditor>
        {(isEdit || isWrite || blogWrite) && (
          <STagContainer>
            <input
              type="text"
              id="tag"
              ref={tagText}
              onChange={onChangeTagHandler}
              maxLength="20"
              placeholder="태그를 추가해 주세요."
            />
            <button type="button" onClick={onAddTagHandler}>
              태그 추가
            </button>
            {tags.map((data, i) => (
              <div className="tags" key={i}>
                {data}
              </div>
            ))}
          </STagContainer>
        )}
      </div>
      <div className="submitWrapper">
        <button type="submit" onClick={onSubmitHandler}>
          {isEdit || isWrite || blogWrite ? "제출하기" : "댓글쓰기"}
        </button>
      </div>
    </Sform>
  );
};

export default Editor;

const Sform = styled.form`
  display: flex;
  flex-direction: column;
  & .titleWrapper {
    display: flex;
    margin-bottom: 18px;
    & #title {
      width: 70%;
      margin-right: 26px;
      padding: 10px 13px;
      border: 1px solid #939393;
    }
  }

  & .submitWrapper {
    align-self: flex-end;
    margin-top: 43px;
    margin-bottom: 10px;

    & button {
      padding: 10px 41px;
      background-color: white;
      border: 1px solid #939393;
    }
  }
`;

const SEditor = styled.div`
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  background-color: white;

  & .ql-container.ql-snow {
    flex: 1;
    overflow: auto;
  }

  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;

const Select = styled.select`
  min-width: 251px;
  width: 30%;
  padding: 10px 30px;
  appearance: none;
  background-image: url(${props => props.arrow});
  background-repeat: no-repeat;
  background-position: center right 30px;
  border: 1px solid #939393;
  border-radius: 30px;

  & option {
    border: 1px solid #939393;
    border-radius: 30px;
  }
`;

const STagContainer = styled.div`
  margin-top: 44px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 140px;
  & input {
    padding: 10px 32px;
    border: 1px solid #939393;
    border-radius: 30px;
    margin-bottom: 10px;
  }

  & button {
    padding: 10px 32px;
    border: none;
    border-radius: 30px;
    margin-left: 4px;
    background: #d9d9d9;
    margin-bottom: 10px;
  }
  & .tags {
    padding: 10px 32px;
    border: none;
    border-radius: 30px;
    margin: 0 10px 10px 10px;
    background: #d9d9d9;
    min-width: 100px;
    display: flex;
    justify-content: center;
  }
`;
