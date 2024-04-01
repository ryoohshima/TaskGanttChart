import React from 'react';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const Navigation = () => {
  return (
    <nav>
      <Stack direction="row" spacing={4}>
        <Link href="/" underline="hover" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
          Home
        </Link>
        <Link href="/members" underline="hover" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
          Members
        </Link>
        <Link
          href="/archive"
          underline="hover"
          sx={{ color: 'text.secondary', fontWeight: 'bold' }}
        >
          Archive
        </Link>
      </Stack>
    </nav>
  );
};

export default Navigation;
