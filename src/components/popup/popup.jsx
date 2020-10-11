import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  text-decoration: none;
  color: rgba(255, 255, 255, 1);

  &:hover {
    opacity: 0.6;
  }

  @media (min-width: 1280px) {
    top: -40px;
    right: -40px;
  }
`;

const PopupCloseIcon = styled.img`
  width: 20px;
  height: 20px;

  @media (min-width: 1280px) {
    width: 40px;
    height: 40px;
  }
`;

const PopupContent = styled.div`
  overflow: auto;
`;

const Popup = (props) => (
  <PopupOverlay>
    <PopupContainer>
      <PopupClose onClick={props.handlePopupClose}>
        <PopupCloseIcon src="/closeIcon.svg" />
      </PopupClose>
      <PopupContent>{props.children}</PopupContent>
    </PopupContainer>
  </PopupOverlay>
);

Popup.propTypes = {
  handlePopupClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Popup;
