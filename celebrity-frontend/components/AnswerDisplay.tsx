import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  answer: string;
}

export default function AnswerDisplay({ answer }: Props) {
  if (!answer) return null;
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Typography variant="h6">Answer</Typography>
        <Typography variant="body1">{answer}</Typography>
      </CardContent>
    </Card>
  );
}