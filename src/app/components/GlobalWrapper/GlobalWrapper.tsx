'use client';

import React, { ReactNode } from 'react';
import { Main, Box } from './GlobalWrapper.styles';
import useZustandStore from '@/app/lib/zustand/useZustandStore';
import Sidebar from '../Sidebar';

interface GlobalWrapperProps {
  children: ReactNode;
}

const GlobalWrapper = ({ children }: GlobalWrapperProps) => {
  const { isSidebarOpen } = useZustandStore();
  return (
    <Box sx={{ display: 'block' }}>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          //   height: '100vh',
          bgcolor: 'background.surface',
          p: 2,
          marginTop: '32px',
          width: '100%',
        }}
      >
        <Main open={isSidebarOpen}>{children}</Main>
      </Box>
    </Box>
  );
};

export default GlobalWrapper;
