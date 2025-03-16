import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const MapLoading = ({ message = 'Loading map...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '500px',
        bgcolor: '#f5f5f5',
        borderRadius: 1
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default MapLoading;