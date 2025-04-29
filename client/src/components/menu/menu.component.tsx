import { FC, useState } from 'react';
import { BtnClose, MenuStyled } from './menu.styled';
import { MenuItem } from '@components/menu-item';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';

export const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuStyled isOpen={isOpen}>
      <BtnClose onClick={toggleOpen}>
        {isOpen ? <RedoOutlinedIcon /> : <UndoOutlinedIcon />}
      </BtnClose>
      <MenuItem
        to="/equipments"
        icon={<SettingsOutlinedIcon />}
        isOpen={isOpen}
        text="Оборудование"
      />
      <MenuItem to="/facilities" icon={<EditRoadOutlinedIcon />} isOpen={isOpen} text="Объекты" />
      <MenuItem
        to="/customers"
        icon={<AccessibleOutlinedIcon />}
        isOpen={isOpen}
        text="Заказчики"
      />
      <MenuItem
        to="/licensees"
        icon={<AssignmentIndOutlinedIcon />}
        isOpen={isOpen}
        text="Лицензиаты"
      />
      <MenuItem
        to="/contracts"
        icon={<AssignmentTurnedInOutlinedIcon />}
        isOpen={isOpen}
        text="Контракты"
      />
      <MenuItem
        to="/documents"
        icon={<ContentPasteOutlinedIcon />}
        isOpen={isOpen}
        text="Документы"
      />
    </MenuStyled>
  );
};
