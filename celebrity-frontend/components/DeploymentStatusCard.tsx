import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

export default function DeploymentStatusCard() {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Deployment Status
        </Typography>
        <Typography variant="body1">
          Current Deployment: <strong>Production</strong>
        </Typography>
        <Chip label="Online" color="success" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  );
}