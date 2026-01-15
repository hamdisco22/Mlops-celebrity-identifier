import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const notifications = [
  'Model retrained successfully.',
  'New dataset version available.',
  'Drift detected in incoming data.',
];

export default function NotificationsList() {
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Notifications
        </Typography>
        <List>
          {notifications.map((note, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary={note} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}