import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SafeRoutes
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/safe-routes">Safe Routes</Button>
          <Button color="inherit" component={Link} to="/report">Report Incident</Button>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;