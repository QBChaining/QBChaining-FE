import React, { useEffect, useState } from "react";

import { useRef } from "react";
// MARK DOWN
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import styled from "styled-components";
const ToastViewer = ({ content }) => {
  console.log(content);
  return (
    <SToastViewer>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={materialDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    </SToastViewer>
  );
};

const SToastViewer = styled.div`
  & code[class*="language-"],
  pre[class*="language-"] {
    text-shadow: none;
  }

  & p {
    word-break: break-all;
  }

  * & ol > li {
    list-style: decimal;
  }

  * & ul > li {
    list-style: disc;
  }

  * & table,
  th,
  td {
    border: 1px solid;
  }

  & * img {
    max-width: 100%;
  }
`;

export default ToastViewer;
