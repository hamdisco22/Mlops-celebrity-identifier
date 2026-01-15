import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

const steps = [
  'Data Collection',
  'Data Preprocessing',
  'Model Training',
  'Evaluation',
  'Deployment',
  'Monitoring',
];

export default function TrainingTimeline() {
  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Training Pipeline
      </Typography>
      <Stepper activeStep={steps.length} orientation="vertical">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}