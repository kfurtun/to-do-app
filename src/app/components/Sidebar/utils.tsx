import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import LabelIcon from '@mui/icons-material/Label';
import HistoryIcon from '@mui/icons-material/History';

export const linkList = [
  { text: 'Today', href: '/', icon: <TodayIcon /> },
  { text: 'Upcoming', href: '/upcoming', icon: <DoubleArrowIcon /> },
  { text: 'History', href: '/history', icon: <HistoryIcon /> },
];

export const favoritesList = [
  { text: 'Favorites', href: '/favorites', icon: <LabelIcon /> },
];
export const projectsList = [
  { text: 'Projects', href: '/projects', icon: <CalendarMonthIcon /> },
];
