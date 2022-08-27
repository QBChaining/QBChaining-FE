import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
  
`;

export default GlobalStyle;
