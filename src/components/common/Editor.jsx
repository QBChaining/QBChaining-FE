import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
import { postQnaListDB } from "../../redux/async/qna";
import { editQnaListDB } from "./../../redux/async/qna";

//이미지 리사이즈 레지스터
Quill.register("modules/ImageResize", ImageResize);

const Editor = ({ isEdit, originData, blogCommnuityEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const placeholder = "입력해주세요";
  const theme = "snow";
  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "code-block"],
      [{ align: [] }],

      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],

      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }],

      ["clean"],
    ],
    ImageResize: {
      modules: ["Resize"],
    },
    syntax: {
      highlight: text => hljs.highlightAuto(text).value,
    },
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
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

  useEffect(() => {
    if (quill) {
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill]);

  //글생성, 수정 함수

  //submithandler
  const onSubmitHandler = e => {
    e.preventDefault();

    if (isEdit) {
      dispatch(
        editQnaListDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
          id: originData.id,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //생성중이라면
    }
    //블로그
    else {
      dispatch(
        postQnaListDB({
          title,
          content: quillRef.current.firstChild.innerHTML,
        }),
      ).then(res => {
        navigate("/qna");
      });
    }
  };

  //titlechangehandler
  const onTitleChangeHandler = e => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(originData.title);
      quillRef.current.firstChild.innerHTML = originData.content;
    }
  }, [isEdit, originData]);

  return (
    <Sform>
      <label htmlFor="title">제목</label>
      <input
        id="title"
        value={title}
        onChange={onTitleChangeHandler}
        type="text"
      />
      <div style={{ width: "100%", height: 500 }}>
        <div ref={quillRef} />
      </div>
      <button type="submit" onClick={onSubmitHandler}>
        제출하기
      </button>
    </Sform>
  );
};

export default Editor;

const Sform = styled.form`
  & .ql-toolbar.ql-snow + .ql-container.ql-snow {
    height: calc(500px - 42px);
  }

  & .ql-snow .ql-editor pre.ql-syntax {
    padding: 20px;
  }
`;
