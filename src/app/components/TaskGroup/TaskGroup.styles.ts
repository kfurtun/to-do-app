import { styled } from '@mui/system';
import Button from '@mui/joy/Button';

export const TaskButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  minWidth: '36px',
  height: '36px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    backgroundColor: 'transparent',
    color: '#e0e0e0',
  },
  '& .check-icon': {
    display: 'none', // Hide the icon by default
    position: 'absolute',
    color: 'neutral',
  },
  '&:hover .check-icon': {
    display: 'block', // Show the icon on hover
  },
}));
