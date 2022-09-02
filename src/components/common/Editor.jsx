import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//유틸 카테고리
import categories from "../../utils/category";

// firebase storage
import { storage } from "../../utils/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//quill
import Quill from "quill";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import ImageResize from "@looop/quill-image-resize-module-react";

//코드블럭 구문강조 highlight.js
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

//로딩이미지
import loadingImage from "../../assets/images/Loading_icon.gif";
import { useDispatch } from "react-redux";
import { postCommentListDB, postQnaListDB } from "../../redux/async/qna";
import { editQnaListDB } from "./../../redux/async/qna";

//이미지 리사이즈 레지스터
Quill.register("modules/ImageResize", ImageResize);
const Editor = ({
  isEdit,
  isWrite,
  isCommentWrite,
  blogCommnuityEdit,
  originData,
  style = "300px",
  qnaId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Java");
  const tagText = useRef();
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const placeholder = "입력해주세요";
  const theme = "snow";

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
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
    "indent",
    "direction",
    "size",
    "font",
    "header",
    "link",
    "image",
    "script",
    "video",
    "color",
    "background",
    "clean",
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

  //toolbar가 오류로 2개생길때 한개 삭제
  if (quillRef.current?.parentNode?.childNodes.length > 2) {
    // return quillRef.current.parentNode.childNodes.removeChild;
    quillRef.current.parentNode.removeChild(
      quillRef.current.parentNode.childNodes[1],
    );
  }

  //생성 or 수정 함수

  const onSubmitHandler = e => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        editQnaListDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
          id: originData.id,

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
          qnaId: parseInt(qnaId),
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
      setTitle(originData.title);
      setCategory(originData.category);
      quillRef.current.firstChild.innerHTML = originData.content;
    }
  }, [isEdit, originData]);

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
      {(isEdit || isWrite) && (
        <>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            value={title}
            onChange={onTitleChangeHandler}
            type="text"
          />
          <label htmlFor="category">카테고리</label>
          <select
            onChange={onCategoryChangeHandler}
            value={isEdit && category}
            name="category"
            id="category"
          >
            {categories.qnaCategory.map(data => (
              <option key={data.langId} value={data.langName}>
                {data.langName}
              </option>
            ))}
          </select>
        </>
      )}

      <div
        style={{ width: "100%", height: style.height, position: "relative" }}
      >
        <div ref={quillRef} />
      </div>
      {(isEdit || isWrite) && (
        <>
          <label htmlFor="tag">태그</label>
          <input
            type="text"
            id="tag"
            ref={tagText}
            onChange={onChangeTagHandler}
          />
          <button type="button" onClick={onAddTagHandler}>
            태그 추가
          </button>
          {tags.map((data, i) => (
            <span style={{ padding: "10px" }} key={i}>
              {data}
            </span>
          ))}
        </>
      )}
      <div>
        <button type="submit" onClick={onSubmitHandler}>
          {isEdit || isWrite ? "제출하기" : "댓글쓰기"}
        </button>
      </div>
    </Sform>
  );
};

export default Editor;

const Sform = styled.form`
  & .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: calc(300px - 42px);
  }

  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;