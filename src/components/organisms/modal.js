import React from "react";
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

const innerBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: '#fff',
  boxShadow: 24,
  p: 4,
};

const selectComponent = (label, item, options = null, onChangeInput, data) => {
  switch (item) {
    case 'input':
      return <TextField key={label} id={label} label={label} value={data[label]} variant="outlined" required onChange={(e) => onChangeInput({ id: e.target.id, value: e.target.value })} />;
    case 'date':
      return <TextField key={label} id={label} label={label} value={data[label]} type="date" variant="outlined" required onChange={(e) => onChangeInput({ id: e.target.id, value: e.target.value })} />;
    case 'select':
      return (
        <TextField key={label} id={label} label={label} value={data[label]} select variant="outlined" required onChange={(e) => onChangeInput({ id: label, value: e.target.value })} >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      )
  }
};

const CustomModal = ({ modalOpen, onModalClose, modalItems, onChangeInput, loading, data, modalButton }) => {
  return (
    <Modal open={modalOpen} onClose={onModalClose}>
      <Box sx={innerBoxStyle}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {modalItems.map((modalItem) => selectComponent(modalItem.label, modalItem.item, modalItem.options, onChangeInput, data))}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', mt: 4 }}>
          <LoadingButton variant={modalButton.variant} onClick={() => modalButton.onClick(data)} loading={loading}>{modalButton.text}</LoadingButton>
          <Button variant="text" onClick={onModalClose}>キャンセル</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default CustomModal;