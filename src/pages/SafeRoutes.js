import React from 'react';
import MapContainer from '../components/Map/MapContainer';
import { Box, Typography, Paper } from '@mui/material';

function SafeRoutes() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Find Safe Routes
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Typography variant="body1">
          Search for safe routes between locations.
        </Typography>
      </Paper>
      <MapContainer />
    </Box>
  );
}

export default SafeRoutes;