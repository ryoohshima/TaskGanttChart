import React from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const CustomTableBody = ({ rows }) => {
  return (
    <TableBody>
      {rows.map((row) => (
        <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          {Object.keys(row).map((key, index) => {
            if (key !== 'id') {
              const align = index === 1 ? 'left' : 'right';
              const width = index === 1 ? '40%' : '20%';
              return (
                <TableCell key={row.id + key} align={align} sx={{ width: width }}>
                  {row[key]}
                </TableCell>
              );
            }
          })}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CustomTableBody;
