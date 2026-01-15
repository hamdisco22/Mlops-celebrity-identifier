import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const metrics = [
  { label: 'Accuracy', value: '92.5%' },
  { label: 'Precision', value: '90.3%' },
  { label: 'Recall', value: '88.7%' },
  { label: 'F1 Score', value: '89.5%' },
];

export default function MetricsDashboard() {
  return (
    <Grid container spacing={2} sx={{ my: 4 }}>
      {metrics.map((metric) => (
        <Grid item xs={12} sm={6} md={3} key={metric.label}>
          <Card>
            <CardContent>
              <Typography variant="h6">{metric.label}</Typography>
              <Typography variant="h4" color="primary">
                {metric.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}