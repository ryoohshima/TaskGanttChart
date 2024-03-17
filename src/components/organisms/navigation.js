import React from 'react';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';

const Navigation = () => {
  return (
    <nav>
      <Stack direction="row" spacing={2}>
        <Link href="/" underline="hover">
          Home
        </Link>
        <Link href="/member" underline="hover">
          Member
        </Link>
        <Link href="/archive" underline="hover">
          Archive
        </Link>
      </Stack>
    </nav>
  );
};

export default Navigation;
