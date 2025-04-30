import roboto from '@assets/fonts/Roboto-Regular.ttf';
import { COLORS } from '@constants';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyled = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${roboto});
    font-weight: 300;
    font-style: normal;
    font-display: auto;
  }

  html, body {
    background-color: ${COLORS.BG};
    margin: 0;
    padding: 0;
  }
`;

export const RootDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainDiv = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

export const ContainerDiv = styled.div`
  width: 100%;
  padding: 10px 20px;
  max-height: 100vh;
  overflow-y: auto;
`;
