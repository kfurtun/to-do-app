'use client';

import React, { useState } from 'react';

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircle from '@mui/icons-material/AddCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import Typography from '@mui/joy/Typography';
import Backdrop from '@mui/material/Backdrop';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import Link from 'next/link';

import { Drawer, DrawerHeader } from './Sidebar.styles';
import { linkList, favoritesList } from './utils';
import ListItem from './ListItem';
import useSignOut from '@/app/hooks/useSignOut';
import useZustandStore from '@/app/lib/zustand/useZustandStore';

const Sidebar = () => {
  const { setIsAddTaskOpen, isSidebarOpen, setIsSidebarOpen } =
    useZustandStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { signOutClick } = useSignOut();

  const handleDrawer = () => {
    setIsSidebarOpen();
  };
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Drawer variant="permanent" open={isSidebarOpen}>
          <DrawerHeader sx={{ justifyContent: 'space-between' }}>
            <Typography
              level="h4"
              noWrap
              component="div"
              sx={{ px: isSidebarOpen ? 2.5 : 0 }}
            >
              {isSidebarOpen && 'Menu'}
            </Typography>
            <IconButton onClick={handleDrawer}>
              {!isSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <ListDivider />
          <ListItem
            open={isSidebarOpen}
            text="Add task"
            isRoleDisabled={false}
            onClick={() => setIsAddTaskOpen()}
          >
            <AddCircle />
          </ListItem>
          <ListDivider />
          <List>
            {linkList.map((item) => (
              <Link
                href={item.href}
                key={item.text}
                onClick={() => setIsSidebarOpen(false)}
              >
                <ListItem open={isSidebarOpen} text={item.text}>
                  {item.icon}
                </ListItem>
              </Link>
            ))}
          </List>
          <ListDivider />
          <List>
            {favoritesList.map((item) => (
              <Link href={item.href} key={item.text}>
                <ListItem open={isSidebarOpen} text={item.text}>
                  {item.icon}
                </ListItem>
              </Link>
            ))}
          </List>
          <List sx={{ marginTop: 'auto' }}>
            <Link href="/settings">
              <ListItem open={isSidebarOpen} text="Settings">
                <SettingsApplicationsIcon />
              </ListItem>
            </Link>
            <ListItem
              open={isSidebarOpen}
              text="Sign out"
              isRoleDisabled={false}
              onClick={async () => await signOutClick()}
            >
              <LogoutIcon />
            </ListItem>
          </List>
        </Drawer>
        {isMobile && (
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer - 1 }}
            open={isSidebarOpen}
            onClick={handleDrawer}
          />
        )}
      </Box>
    </>
  );
};

export default Sidebar;
