import { FC } from 'react';
import { MenuLink, LinkText } from './menu-item.styled';
import { MenuItemProps } from './menu-item.types';

export const MenuItem: FC<MenuItemProps> = ({ icon, isOpen, to, text }) => {
  return (
    <MenuLink to={to}>
      {icon}
      {isOpen && <LinkText>{text}</LinkText>}
    </MenuLink>
  );
};
