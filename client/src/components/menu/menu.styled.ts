import { COLORS } from '@constants';
import styled, { css } from 'styled-components';

interface MenuProps {
  isOpen: boolean;
}

export const MenuStyled = styled.aside<MenuProps>`
  ${({ isOpen }) => css`
    background-color: ${COLORS.MAIN_BG};
    display: flex;
    flex-direction: column;
    padding: 20px 0px;
    width: ${isOpen ? '330px' : '60px'};
    align-items: center;
    transition: all 0.2s ease;
    max-height: 100vh;
  `}
`;

export const BtnClose = styled.div`
  font-size: 20px;
  margin-bottom: 15px;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;
