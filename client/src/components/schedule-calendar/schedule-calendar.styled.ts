import { COLORS, PARAMS } from '@constants';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';

import { getColors } from './schedule-calendar.constants';

export const Table = styled.table`
  border: 1px solid ${COLORS.MAIN_BG};
  border-spacing: 0;
  font-family: ${PARAMS.DEFAULT_FONT};
`;

export const THead = styled.thead`
  & td {
    border-bottom: 1px solid ${COLORS.TEXT_COLOR};
    font-size: ${PARAMS.REGULAR_FONT_SIZE};
    background-color: ${COLORS.MAIN_BG};
    color: white;
    padding: 10px 15px;
  }
`;

export const TBody = styled.tbody`
  & td {
    color: ${COLORS.TEXT_COLOR};
    background-color: white;
    padding: 10px 15px;
  }
`;

export const Td = styled.td<{ status?: number }>`
  ${({ status = 0 }) => css`
    background-color: ${getColors(status)} !important;

    &:hover {
      cursor: pointer;
      background-color: ${darken(0.1, 'white')};
    }
  `}
`;
