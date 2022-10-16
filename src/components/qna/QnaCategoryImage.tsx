import React, { useEffect, useState } from "react";
import c from "../../assets/images/icon/c.png";
import csharp from "../../assets/images/icon/csharp.png";
import cplus from "../../assets/images/icon/cplus.png";
import css from "../../assets/images/icon/css.png";
import java from "../../assets/images/icon/java.png";
import javascript from "../../assets/images/icon/javascript.png";
import nodejs from "../../assets/images/icon/nodejs.png";
import kotline from "../../assets/images/icon/kotline.png";
import php from "../../assets/images/icon/php.png";
import python from "../../assets/images/icon/python.png";
import vue from "../../assets/images/icon/vue.png";
import reactIcon from "../../assets/images/icon/react.png";
import styled from "styled-components";
const QnaCategoryImage = ({ item }: { item: string }) => {
  const [icon, setIcon] = useState("");
  const nameChange = (item: string) => {
    switch (item) {
      case "JavaScript":
        setIcon(javascript);
        break;
      case "Node.js":
        setIcon(nodejs);
        break;
      case "React":
        setIcon(reactIcon);
        break;
      case "Vue":
        setIcon(vue);
        break;
      case "Kotline":
        setIcon(kotline);
        break;
      case "Java":
        setIcon(java);
        break;
      case "Python":
        setIcon(python);
        break;
      case "C":
        setIcon(c);
        break;
      case "C++":
        setIcon(cplus);
        break;
      case "C#":
        setIcon(csharp);
        break;
      case "CSS":
        setIcon(css);
        break;
      case "PHP":
        setIcon(php);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    nameChange(item);
  }, []);

  return <SImage icon={icon}></SImage>;
};

export default QnaCategoryImage;

const SImage = styled.div<{ icon: string }>`
  background-image: url(${props => props.icon});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 32px;
  height: 32px;
`;
