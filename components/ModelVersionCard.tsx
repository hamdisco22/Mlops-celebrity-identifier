import React from 'react';
import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';

export default function ModelVersionCard() {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Active Model Version
        </Typography>
        <Typography variant="subtitle1">Version: v2.1.0</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          This model uses a Convolutional Neural Network trained on a curated celebrity
          dataset. Deployed on 2025-12-01.
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="CNN" color="primary" />
          <Chip label="Llama-4 QA" color="secondary" />
        </Stack>
      </CardContent>
    </Card>
  );
}