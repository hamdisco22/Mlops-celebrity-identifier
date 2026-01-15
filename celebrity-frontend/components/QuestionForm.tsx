import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface Props {
  onSubmit: (question: string) => void;
}

export default function QuestionForm({ onSubmit }: Props) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim().length > 0) {
      onSubmit(question);
      setQuestion('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 3 }}>
      <TextField
        fullWidth
        label="Ask a question about the identified celebrity"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Ask Question
      </Button>
    </Box>
  );
}