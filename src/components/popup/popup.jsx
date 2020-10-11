import React from "react";
import styled from "styled-components";

const PopupOverlay = styled.section`
display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
`;

const PopupContainer = styled.div`
  margin: auto;
  background: #fff;
  border-radius: 5px;
  position: relative;
  transition: all 5s ease-in-out;
`;

const PopupClose = styled.a`
  position: absolute;
  top: -30px;
  right: -20px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: rgba(255, 255, 255, 1);

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const PopupContent = styled.div`
  max-height: 30%;
  overflow: auto;
`;

const PopupTitle = styled.p`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  color: black;
  text-align: left;
`;

const Popup = (props) => {
  return (
    <PopupOverlay>
      <PopupContainer>
        <PopupClose onClick={props.handlePopupClose}>x</PopupClose>
        <PopupContent>{props.children}</PopupContent>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
