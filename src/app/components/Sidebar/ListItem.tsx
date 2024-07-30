import React, { ReactNode } from 'react';

import ListItemMui from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

interface Props {
  open: boolean;
  children: ReactNode;
  text: string;
  isRoleDisabled?: boolean;
  onClick?: () => void;
}

const ListItem = ({
  open,
  children,
  text,
  isRoleDisabled = true,
  onClick,
}: Props) => {
  return (
    <ListItemMui disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        role={isRoleDisabled ? 'presentation' : 'button'}
        tabIndex={isRoleDisabled ? -1 : 0}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {children}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItemMui>
  );
};

export default ListItem;
