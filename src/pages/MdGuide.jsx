import React from "react";
import { Editor } from "@toast-ui/react-editor";
import styled from "styled-components";

const MdGuide = ({ setGuideOpen }) => {
  const closeModal = () => {
    setGuideOpen(false);
  };

  const initialValue = "";
  return (
    <SWrapper>
      <SMdGuide>
        <SCloseButton onClick={closeModal}>닫기버튼</SCloseButton>
        <Editor
          toolbarItems={[]}
          height={"100%"}
          hideModeSwitch={true}
          useCommandShortcut={false}
          initialEditType="markdown"
          previewStyle={"vertical"}
          initialValue={initialValue}
        />
      </SMdGuide>
    </SWrapper>
  );
};

export default MdGuide;

const SWrapper = styled.div`
  position: fixed;
  left: 200px;
  top: 230px;
  min-width: 675px;
  width: calc(100% - 350px);
  background-color: white;
  border: 1px solid black;
  height: calc(100vh - 300px);
  z-index: 9999;
`;

const SMdGuide = styled.div`
  position: relative;
`;

const SCloseButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`;
