import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    font-family: 'Noto Sans KR', sans-serif;
  }

  ul, ol, li {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  input {

    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }
  }
  
  select {
    &:active {
      outline: none;
    }

    &:focus {
      outline: none;
    }
  }

  body {
    min-height: 100vh;
    background-color: ${props => props.theme.color.mainIvory};
  }
`;

export default GlobalStyle;
