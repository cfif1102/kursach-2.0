import { FC, useMemo, useState } from 'react';

import { MenuItem } from '@components';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';

import { MENU_ITEMS } from './menu.constants';
import { BtnClose, MenuStyled } from './menu.styled';

export const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = useMemo(
    () => MENU_ITEMS.map((props, index) => <MenuItem {...props} key={index} isOpen={isOpen} />),
    [isOpen],
  );

  return (
    <MenuStyled isOpen={isOpen}>
      <BtnClose onClick={toggleOpen}>
        {isOpen ? <RedoOutlinedIcon /> : <UndoOutlinedIcon />}
      </BtnClose>

      {menuItems}
    </MenuStyled>
  );
};
