import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', feedback);
    setFeedback('');
  };
  return (
    <Card sx={{ my: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Send Feedback
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Your feedback"
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}