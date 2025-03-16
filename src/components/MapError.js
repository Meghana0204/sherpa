import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const MapError = ({ message = 'Unable to load map', onRetry }) => {
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
      <ErrorIcon color="error" sx={{ fontSize: 60 }} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
      {onRetry && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onRetry}
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default MapError;