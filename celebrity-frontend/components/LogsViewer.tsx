import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const logs = [
  '2026-01-15 10:00 Model v2.1.0 deployed successfully.',
  '2026-01-15 11:30 Training job started on dataset v1.3.',
  '2026-01-15 12:45 Data validation completed with 0 errors.',
  '2026-01-15 14:10 Evaluation metric improved to 0.92 accuracy.',
];

export default function LogsViewer() {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Logs
        </Typography>
        <List dense>
          {logs.map((log, index) => (
            <ListItem key={index}>
              <ListItemText primary={log} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}