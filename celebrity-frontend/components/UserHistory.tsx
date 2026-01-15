import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const historyItems = [
  '2026-01-15 09:45 Uploaded image of Actor A',
  '2026-01-14 17:20 Uploaded image of Singer B',
  '2026-01-13 12:00 Uploaded image of Athlete C',
];

export default function UserHistory() {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your History
        </Typography>
        <List>
          {historyItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}