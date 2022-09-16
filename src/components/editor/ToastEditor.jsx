import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import styled from "styled-components";

const ToastEditor = ({ isCommentWrite, content, setContent }) => {
  const editorRef = useRef();
  const QnatoolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["codeblock"],
    ["ul", "ol", "task"],
    ["hr"],
    ["table", "link"],
    ["scrollSync"],
  ];
  const BlogtoolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["codeblock"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["hr"],
    ["image"],
    ["scrollSync"],
  ];

  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setContent(data);
  };

  const onBlur = () => {
    // setContent("");
    console.log(editorRef.current.getInstance().getHTML());
  };

  return (
    <SEditor>
      <Editor
        //코드
        // initialValue="마크다운으로 내용을 입력하세요!"
        placeholder="마크다운으로 내용을 입력하세요!"
        previewStyle={isCommentWrite ? "tab" : "vertical"}
        height={isCommentWrite ? "600px" : "500px"}
        initialEditType="markdown"
        toolbarItems={QnatoolbarItems}
        useCommandShortcut={false}
        hideModeSwitch={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highligher: Prism }]]}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
        onBlur={onBlur}
      />
    </SEditor>
  );
};

export default ToastEditor;

const SEditor = styled.div`
  & .ProseMirror {
    background-color: white;
    height: 100%;
  }

  & .toastui-editor-main-container {
    background-color: ${props => props.theme.color.white};
  }
`;
