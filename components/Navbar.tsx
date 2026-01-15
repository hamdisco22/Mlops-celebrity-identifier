import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Celebrity Identifier
        </Typography>
        <Button color="inherit" href="#features">
          Features
        </Button>
        <Button color="inherit" href="#dashboard">
          Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
}