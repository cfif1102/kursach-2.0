import AccessibleOutlinedIcon from '@mui/icons-material/AccessibleOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import EditRoadOutlinedIcon from '@mui/icons-material/EditRoadOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const MENU_ITEMS = [
  {
    to: '/equipments',
    icon: <SettingsOutlinedIcon />,
    text: 'Оборудование',
  },
  {
    to: '/facilities',
    icon: <EditRoadOutlinedIcon />,
    text: 'Объекты',
  },
  {
    to: '/customers',
    icon: <AccessibleOutlinedIcon />,
    text: 'Заказчики',
  },
  {
    to: '/licensees',
    icon: <AssignmentIndOutlinedIcon />,
    text: 'Лицензиаты',
  },
  {
    to: '/contracts',
    icon: <AssignmentTurnedInOutlinedIcon />,
    text: 'Контракты',
  },
  {
    to: '/documents',
    icon: <ContentPasteOutlinedIcon />,
    text: 'Документы',
  },
  {
    to: '/schedule',
    icon: <CalendarMonthOutlinedIcon />,
    text: 'График',
  },
];
