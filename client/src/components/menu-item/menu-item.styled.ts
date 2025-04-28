import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { darken } from 'polished';
import { COLORS, PARAMS } from '@constants';

export const MenuLink = styled(NavLink)`
  color: ${darken(0.3, 'white')};
  text-decoration: none;
  font-size: ${PARAMS.LARGE_FONT_SIZE};
  font-family: ${PARAMS.DEFAULT_FONT};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    color: white;
  }

  &.active {
    background: ${COLORS.SECONDARY};
    color: white;
  }
`;

export const LinkText = styled.div`
  margin-left: 15px;
`;
