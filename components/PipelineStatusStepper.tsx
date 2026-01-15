import React from 'react';
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material';

const pipelineSteps = [
  'Data Ingestion',
  'Training',
  'Validation',
  'Deployment',
  'Monitoring',
];

export default function PipelineStatusStepper() {
  const activeStep = 4; // assume the pipeline is at final stage for demonstration

  return (
    <Box sx={{ width: '100%', my: 4 }}>
      <Typography variant="h5" gutterBottom>
        Pipeline Status
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {pipelineSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}