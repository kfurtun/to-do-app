'use client';

import { Typography, Box } from '@mui/joy';

interface HeaderProps {
  count?: number;
  header: string;
  hasCount: boolean;
}

const Header = ({ count, header, hasCount = false }: HeaderProps) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '800px' }}>
      <Typography level="h1" sx={{ mb: 2, textAlign: 'left', fontSize: 26 }}>
        {header}
      </Typography>
      {hasCount && (
        <Typography level="body-sm" sx={{ mb: 2, textAlign: 'left' }}>
          {count || 0} tasks
        </Typography>
      )}
    </Box>
  );
};

export default Header;
