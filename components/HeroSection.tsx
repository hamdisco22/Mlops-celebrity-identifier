import React from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function HeroSection() {
  return (
    <Box
      sx={{
        p: 4,
        textAlign: 'center',
        backgroundImage:
          'linear-gradient(to right, rgba(63,81,181,0.8), rgba(244,143,177,0.8))',
        color: '#fff',
        borderRadius: 2,
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to Celebrity Identifier
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Upload a photo to identify celebrities and explore the underlying MLOps
        pipeline.
      </Typography>
      <Button variant="contained" color="secondary" href="#upload">
        Get Started
      </Button>
    </Box>
  );
}