import React, { useEffect, useRef, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import styled from "styled-components";
import categories from "../../utils/category";
import { storage } from "../../utils/firebase";

//파이어베이스
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//텍스트에디터
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

//컴포넌트
import Select from "./Select";
//통신
import {
  patchBlogCommunityDB,
  postBlogCommunityDB,
} from "../../redux/async/blog";
import {
  editQnaListDB,
  postCommentListDB,
  postQnaListDB,
} from "../../redux/async/qna";
//알럿
import { errorAlert } from "../../utils/swal";
//이미지
import DeleteButton from "../../assets/images/DeleteButton.png";

type options = {
  isEdit?: boolean;
  isWrite?: boolean;
  isCommentWrite?: boolean;
  isBlogEdit?: boolean;
  isBlogWrite?: boolean;
  id?: string;
  blogEditId?: number;
  blogEditData?: {};
  editData?: {};
};

const EditorComponent = ({
  isEdit,
  isWrite,
  isCommentWrite,
  isBlogEdit,
  isBlogWrite,
  id,
  blogEditId,
  blogEditData,
  editData,
}: options) => {
  const isComment = useSelector(state => state.qnaSlice.isCommentWrite);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tagText = useRef();
  const titleText = useRef();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const nextId = useRef(1);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [blogTitle, setBlogTitle] = useState("");
  const location = window.location.pathname;
  const { isLogin, userName, userProfile } = useSelector(
    state => state.userSlice,
  );
  const editorRef = useRef();

  const QnatoolbarItems = [
    ["codeblock"],
    ["heading", "bold", "italic", "strike"],
    ["ul", "ol"],
    ["hr"],
    ["table"],
    ["scrollSync"],
  ];
  const BlogtoolbarItems = [
    ["codeblock"],
    ["heading", "bold", "italic", "strike"],
    ["ul", "ol"],
    ["table"],
    ["hr"],
    ["image"],
    ["scrollSync"],
  ];
  const initialValue = "";

  const onChangeContent = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setContent(data);
  };

  //생성 or 수정 함수
  const onSubmitHandler = e => {
    e.preventDefault();
    //로그인이 안되어있을때 알럿
    if (!isLogin) {
      errorAlert("로그인이 필요한 기능입니다!");
      return;
    }

    //빈칸 알럿
    if (titleText.current !== undefined && titleText.current.value.length < 1) {
      errorAlert("제목을 입력해주세요!");
      return;
    }

    if (content.length === 0) {
      errorAlert("본문을 입력해주세요!");
      return;
    }

    if (!isCommentWrite && !isBlogEdit) {
      if (tags.length < 1) {
        errorAlert("최소 1개의 태그가 필요합니다!");
        return;
      }
    }

    if ((isEdit || isWrite) && category === "") {
      errorAlert("카테고리를 선택해주세요!");
      return;
    }

    //수정중이라면
    if (isEdit) {
      dispatch(
        editQnaListDB({
          title,
          content,
          id: editData.id,
          category: category,
          tags,
        }),
      ).then(res => {
        navigate("/qna");
      });
      //생성중이라면
    } else if (isWrite) {
      dispatch(
        postQnaListDB({
          title,
          content,
          category: category,
          tags,
        }),
      ).then(res => {
        navigate(`/qna/detail/${res.payload.data.id}`);
      });
      //코멘트작성
    } else if (isCommentWrite) {
      dispatch(
        postCommentListDB({
          content,
          id: parseInt(id),
          honey_tip: 0,
          userName: userName,
          profileImg: userProfile,
        }),
      );
      //작성 후 입력 값 초기화
      editorRef.current.getInstance().setMarkdown("", true);
      setContent("");
      //블로그 수정, 생성
    } else if (isBlogWrite) {
      dispatch(
        postBlogCommunityDB({
          title,
          content,
          tags,
        }),
      ).then(blogWrite => {
        navigate(`/blog/detail/${blogWrite.payload.id}`);
      });
    } else if (isBlogEdit) {
      navigate(`/blog/detail/${blogEditId}`);
      dispatch(
        patchBlogCommunityDB({
          title: blogTitle,
          content,
          id: blogEditId,
        }),
        setBlogTitle(blogEditData.title),
      );
    }
  };

  /**titlechangehandler  */
  const onTitleChangeHandler = e => {
    if (isBlogEdit) {
      setBlogTitle(e.target.value);
    } else {
      setTitle(e.target.value);
    }
  };
  //edit상황이라면 타이틀, content 가져오기
  useEffect(() => {
    if (isEdit) {
      setTitle(editData.title);
      setCategory(editData.category);
      // quillRef.current.firstChild.innerHTML = editData.content;
    }
  }, [isEdit, editData, isComment]);

  /** 블로그 게시글 수정할 때  원래 있던 벨류 값  불러오기  */
  useEffect(() => {
    if (isBlogEdit) {
      setBlogTitle(blogEditData.title);
      editorRef.current.getInstance().setMarkdown(blogEditData.content, true);
    }
  }, [isBlogEdit]);

  const onCategoryChangeHandler = e => {
    setCategory(e.target.value);
  };

  //태그입력
  const onChangeTagHandler = e => {
    setTag(e.target.value);
  };

  //태그추가
  const onAddTagHandler = () => {
    if (tags.length > 4) {
      errorAlert("태그는 5개가 최대입니다!");
      return;
    }
    if (tagText.current.value.length < 1) {
      errorAlert("빈칸입니다.");
      return;
    }
    if (tags.filter(data => data === tagText.current.value).length === 1) {
      errorAlert("이미 추가된 태그입니다!");
      return;
    }

    setTags([...tags, tag]);
    setTag("");
    nextId.current += 1;
    tagText.current.value = "";
  };

  const onKeyPress = e => {
    if (e.key === "Enter") {
      onAddTagHandler();
    }
  };

  //태그 삭제
  const onDeleteTagHandler = data => {
    setTags(tags.filter(tag => tag !== data));
  };

  return (
    <Sform>
      <div>
        {(isEdit || isWrite || isBlogWrite || isBlogEdit) && (
          <STitleWrapper>
            <input
              id="title"
              value={isBlogEdit ? blogTitle || "" : title || ""}
              onChange={onTitleChangeHandler}
              type="text"
              ref={titleText}
              maxLength="50"
              placeholder="제목을 입력해주세요."
              // initialText={blogTitle}
            />
            {(isEdit || isWrite) && (
              <Select
                setOption={setCategory}
                options={categories.qnaCategory}
                initialText={"카테고리"}
                zIndex={10}
              />
            )}
          </STitleWrapper>
        )}
        <SEditor>
          <Editor
            // placeholder="마크다운으로 내용을 입력하세요!"
            initialValue={initialValue}
            previewStyle={isCommentWrite ? "tab" : "vertical"}
            height={isCommentWrite ? "60vh" : "50vh"}
            initialEditType="markdown"
            toolbarItems={
              isBlogEdit || isBlogWrite ? BlogtoolbarItems : QnatoolbarItems
            }
            useCommandShortcut={false}
            hideModeSwitch={true}
            plugins={[[codeSyntaxHighlight, { highligher: Prism }]]}
            language="ko-KR"
            ref={editorRef}
            onChange={onChangeContent}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                //firebase에 이미지 업로드
                const uploaded_file = await uploadBytes(
                  ref(storage, `images/${Date.now()}`),
                  blob,
                );
                //firebase에 올라간 이미지url 저장
                const file_url = await getDownloadURL(uploaded_file.ref);
                //firebase에 이미지 업로드 완료 후 url 추출후 textEditor에 삽입
                callback(file_url);
              },
            }}
          />
        </SEditor>
      </div>
      <SSubmitWrapper>
        {(isEdit || isWrite || isBlogWrite) && (
          <STagContainer>
            <SInputContainer>
              <input
                onKeyPress={onKeyPress}
                type="text"
                id="tag"
                ref={tagText}
                onChange={onChangeTagHandler}
                maxLength="10"
                placeholder="태그를 추가해 주세요."
              />
              <SAddButton type="button" onClick={onAddTagHandler}>
                추가
              </SAddButton>
            </SInputContainer>
            {tags.map(data => (
              <STagsWrapper key={nanoid()}>
                <STags className="tags">{data}</STags>
                <STagRemove
                  onClick={() => {
                    onDeleteTagHandler(data);
                  }}
                  type="button"
                />
              </STagsWrapper>
            ))}
          </STagContainer>
        )}
        {isCommentWrite ? (
          <SCommentWriteButton type="button" onClick={onSubmitHandler}>
            댓글쓰기
          </SCommentWriteButton>
        ) : (
          <SSubmitButton
            type="button"
            onClick={onSubmitHandler}
            location={location}
          >
            {isEdit || isWrite || isBlogWrite || isBlogEdit
              ? "작성하기"
              : "댓글쓰기"}
          </SSubmitButton>
        )}
      </SSubmitWrapper>
    </Sform>
  );
};

export default EditorComponent;

const Sform = styled.form`
  display: flex;
  flex-direction: column;
`;

const STitleWrapper = styled.div`
  display: flex;
  margin-bottom: 18px;
  & #title {
    width: 70%;
    margin-right: 26px;
    padding: 10px 13px;
    border: 1px solid #939393;
  }
`;

const SSubmitWrapper = styled.div`
  position: relative;
  width: 100%;
  justify-content: space-between;
  display: flex;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SelectWrapper = styled.select`
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
  display: flex;
  flex-wrap: wrap;
  /* margin-right: 50px; */
`;

const SInputContainer = styled.div`
  position: relative;
  & input {
    padding: 10px 82px 10px 25px;
    border: 1px solid #939393;
    border-radius: 30px;
    margin-bottom: 10px;
  }
`;

const SAddButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 20px;
  border: none;
  border-radius: 30px;
  margin-left: 4px;
  background-color: ${props => props.theme.color.grey5};
  border: 1px solid ${props => props.theme.color.grey5};
  color: ${props => props.theme.color.white};
`;

const STags = styled.div`
  padding: 10px 32px;
  border: none;
  border-radius: 30px;
  margin: 0 10px 10px 10px;
  background: ${props => props.theme.color.grey3};
  min-width: 100px;
  display: flex;
  justify-content: center;
  color: ${props => props.theme.color.white};
`;

const SSubmitButton = styled.button`
  height: 40px;
  min-width: 140px;
  background-color: ${props => props.theme.color.mainOrange};
  border: none;
  color: ${props => props.theme.color.white};
  border-radius: 20px;
`;

const SCommentWriteButton = styled.button`
  position: absolute;
  right: 0;
  bottom: -37px;
  height: 40px;
  min-width: 140px;
  border-radius: 20px;
  color: ${props => props.theme.color.white};
  border: none;
  background-color: ${props => props.theme.color.mainOrange};
  font-weight: 500;
`;

const STagRemove = styled.button`
  position: absolute;
  background-color: transparent;
  border: none;
  width: 20px;
  height: 20px;
  right: 5px;
  top: -10px;
  background-image: url(${DeleteButton});
  background-size: contain;
`;
const STagsWrapper = styled.div`
  display: flex;
  position: relative;
`;

const SEditor = styled.div`
  & .ProseMirror {
    background-color: white;
    height: 100%;
  }

  & .toastui-editor-main-container {
    background-color: ${props => props.theme.color.white};
  }

  color: black;
`;
