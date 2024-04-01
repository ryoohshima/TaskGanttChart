import React from "react";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Stack from '@mui/material/Stack';

const EmptyData = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" height={100}>
      <ReportProblemIcon />
      データがありません
    </Stack>
  );
}

export default EmptyData;