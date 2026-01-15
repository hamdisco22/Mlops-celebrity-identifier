import React from 'react';
import { Modal, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ComparisonModal({ open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Compare Models
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Model A (v2.1)</Typography>
                <Typography variant="body2">Accuracy: 92.5%</Typography>
                <Typography variant="body2">F1 Score: 89.5%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Model B (v1.8)</Typography>
                <Typography variant="body2">Accuracy: 88.2%</Typography>
                <Typography variant="body2">F1 Score: 86.1%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}