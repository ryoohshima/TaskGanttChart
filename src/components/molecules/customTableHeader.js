import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const CustomTableHeader = ({ header }) => {
  return (
    <TableHead>
      <TableRow>
        {header.map((val, index) => {
          return (
            <TableCell key={val} align={index === 0 ? 'left' : 'right'}>
              {val}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
