import React from 'react';
import { Paper, Box, Typography, Button, ButtonGroup } from '@mui/material';

const MarkerControls = ({ markers, onDeleteMarker, onClearMarkers }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Saved Locations
      </Typography>
      
      {markers.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          No locations marked yet. Click on the map or use the search to add locations.
        </Typography>
      ) : (
        <>
          <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {markers.map((marker, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">
                  {marker.title || `Location ${index + 1}`}
                </Typography>
                <Button 
                  size="small" 
                  color="error" 
                  onClick={() => onDeleteMarker(index)}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Box>
          
          <ButtonGroup fullWidth sx={{ mt: 2 }}>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={onClearMarkers}
            >
              Clear All
            </Button>
          </ButtonGroup>
        </>
      )}
    </Paper>
  );
};

export default MarkerControls;