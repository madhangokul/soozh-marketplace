import React from 'react';
import { Box, Typography } from '@mui/material';

const Sidebar = ({ paginationInfo }) => (
  <Box sx={{ flex: '1 1 30%', p: 2, height: '100vh', overflowY: 'auto' }}>
    <Typography variant="h6">Filters go here</Typography>
    {paginationInfo && (
      <Typography variant="body2">
        Total Items: {paginationInfo.totalItems || 0},
        Current Page: {paginationInfo.currentPage || 1} of {paginationInfo.totalPages || 1}
      </Typography>
    )}
  </Box>
);

export default Sidebar;
