'use client';

import React, { ReactNode } from 'react';
import { Main, Box } from './GlobalWrapper.styles';
import useZustandStore from '@/app/lib/zustand/useZustandStore';
import Sidebar from '../Sidebar';
import { usePathname } from 'next/navigation';

interface GlobalWrapperProps {
  children: ReactNode;
}

// TODO add api route
const pathsToHide = ['/login', '/signup', '/api/graphql'];

const GlobalWrapper = ({ children }: GlobalWrapperProps) => {
  const { isSidebarOpen } = useZustandStore();
  const pathname = usePathname();
  return (
    <Box sx={{ display: 'block' }}>
      {!pathsToHide.includes(pathname) && <Sidebar />}
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
