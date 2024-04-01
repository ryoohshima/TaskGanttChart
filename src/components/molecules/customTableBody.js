import React, { useState } from 'react';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RestoreIcon from '@mui/icons-material/Restore';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const RowMenu = ({ row, onDeleteData, onShowModal, onRestoreData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {onShowModal && (
          <MenuItem onClick={() => { onShowModal(row); handleClose(); }}>
            <EditIcon />
            edit
          </MenuItem>
        )}
        {onDeleteData && (
          <MenuItem onClick={() => onDeleteData(row.id)}>
            <DeleteIcon />
            delete
          </MenuItem>
        )}
        {onRestoreData && (
          <MenuItem onClick={() => onRestoreData(row.id)}>
            <RestoreIcon />
            restore
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

const CustomTableBody = ({ rows, onDeleteData, onShowModal, onRestoreData }) => {
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
          <TableCell align="right">
            <RowMenu row={row} onDeleteData={onDeleteData} onShowModal={onShowModal} onRestoreData={onRestoreData} />
          </TableCell>
        </TableRow>
      ))
      }
    </TableBody >
  );
};

export default CustomTableBody;
