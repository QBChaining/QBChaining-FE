import React, { useRef } from "react";
import { Editor } from "@toast-ui/react-editor";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";

import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";

const ToastEditor = ({ isCommentWrite, content, setContent }) => {
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getMarkdown();
    setContent(data);
    // editorRef.current = "";
  };

  return (
    <>
      <Editor
        initialValue="마크다운으로 내용을 입력하세요!"
        previewStyle={isCommentWrite ? "tap" : "vertical"}
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={false}
        hideModeSwitch={true}
        plugins={[colorSyntax, [codeSyntaxHighlight, { highligher: Prism }]]}
        language="ko-KR"
        ref={editorRef}
        onChange={onChange}
      />
    </>
  );
};

export default ToastEditor;
