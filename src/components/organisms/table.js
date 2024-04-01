import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CustomTableHeader from '@/components/molecules/customTableHeader';
import CustomTableBody from '@/components/molecules/customTableBody';

const CustomTable = ({ header, rows, onDeleteData, onShowModal, onRestoreData, onFinishTask }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="simple table">
        <CustomTableHeader header={header} />
        <CustomTableBody rows={rows} onDeleteData={onDeleteData} onShowModal={onShowModal} onRestoreData={onRestoreData} onFinishTask={onFinishTask} />
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
