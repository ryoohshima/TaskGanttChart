import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CustomTableHeader from '@/components/molecules/customTableHeader';
import CustomTableBody from '@/components/molecules/customTableBody';

const CustomTable = ({ header, rows }) => {
  return (
    <TableContainer component={Paper} sx={{ width: '650px' }}>
      <Table aria-label="simple table">
        <CustomTableHeader header={header} />
        <CustomTableBody rows={rows} />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
