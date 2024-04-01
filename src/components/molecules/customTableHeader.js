import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const CustomTableHeader = ({ header }) => {
  return (
    <TableHead>
      <TableRow>
        {header.map((val, index) => {
          const align = index === 0 ? 'left' : 'right';
          const width = index === 0 ? '40%' : '20%';
          return (
            <TableCell key={val} align={align} sx={{ width: width }}>
              {val}
            </TableCell>
          );
        })}
        <TableCell />
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
