import styled from 'styled-components';

import {
  fontSizeBase,
  fontWeightBase,
  navbarPaddingHorizontal,
  navbarPaddingVertical,
} from '../../styles/variables';

const ToggleButton = styled.button`
  /* shared */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: ${fontWeightBase};
  overflow-x: hidden;
  overflow-y: auto;
  font-size: ${fontSizeBase};
  box-sizing: border-box;

  float: left;
  background-color: transparent;
  background-image: none;
  border: none;
  outline: none;
  padding: ${(parseInt(navbarPaddingVertical, 10) + 3)}px ${navbarPaddingHorizontal};
  text-decoration: none;
  &:focus,
  &:active {
    background: transparent;
  }

  /* theme */
  color: #fff; 
  ${props => props.theme.navbarItemBorder && `
    border-right: ${props.theme.navbarItemBorder};
  `};
  &:hover {
    color: ${props => props.theme.navbarHoverColor || '#fff'};
    background-color: #fff;
  }
`;

export default ToggleButton;
