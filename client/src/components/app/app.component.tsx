import { FC } from 'react';

import { Menu } from '@components';
import { Outlet } from 'react-router-dom';

import { ContainerDiv, GlobalStyled, MainDiv, RootDiv } from './app.styled';

export const App: FC = () => {
  return (
    <RootDiv>
      <MainDiv>
        <Menu />

        <ContainerDiv>
          <Outlet />
        </ContainerDiv>
      </MainDiv>

      <GlobalStyled />
    </RootDiv>
  );
};
