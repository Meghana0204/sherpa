import React from 'react';
import { InfoWindow as GoogleInfoWindow } from '@react-google-maps/api';
import { Typography, Box, Button } from '@mui/material';

const InfoWindow = ({ position, content, onClose }) => {
  return (
    <GoogleInfoWindow
      position={position}
      onCloseClick={onClose}
    >
      <Box sx={{ p: 1, maxWidth: 200 }}>
        <Typography variant="subtitle2" gutterBottom>
          {content.title}
        </Typography>
        
        {content.description && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            {content.description}
          </Typography>
        )}
        
        {content.actions && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            {content.actions.map((action, index) => (
              <Button
                key={index}
                size="small"
                variant={action.primary ? "contained" : "outlined"}
                onClick={action.onClick}
                sx={{ ml: 1 }}
              >
                {action.label}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </GoogleInfoWindow>
  );
};

export default InfoWindow;