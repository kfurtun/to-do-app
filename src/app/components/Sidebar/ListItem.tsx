import React, { ReactNode } from 'react';

import ListItemMui from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/joy/Tooltip';

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
  const _listItem = (
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

  return open ? (
    _listItem
  ) : (
    <Tooltip title={text} placement="right">
      {_listItem}
    </Tooltip>
  );
};

export default ListItem;
