import { FC } from 'react';
import { ContainerDiv, GlobalStyled, MainDiv, RootDiv } from './app.styled';
import { Outlet } from 'react-router-dom';
import { Menu } from '@components/menu';

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
