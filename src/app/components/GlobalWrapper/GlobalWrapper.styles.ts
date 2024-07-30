import { styled } from '@mui/material/styles';
import { drawerWidthClosed } from '../Sidebar/Sidebar.styles';

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    marginLeft: 0,
    // marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 64px)',
    marginLeft: `${drawerWidthClosed}px`,
  },
}));

export const Box = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { display: 'flex' },
}));
