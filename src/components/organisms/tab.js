import React from "react";
import { Box } from "@mui/material";
import { Tab, Tabs } from "@mui/material";

const CustomTabs = ({ buttons, tabValue, onTabChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={tabValue} onChange={onTabChange} aria-label="basic tabs example">
        {buttons.map((button) => (
          <Tab key={button.id} label={button.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTabs;