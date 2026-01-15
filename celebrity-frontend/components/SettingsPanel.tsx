import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SettingsPanel() {
  const [apiKey, setApiKey] = useState('');
  const handleSave = () => {
    // In a real app you'd persist this to secure storage
    console.log('Saved API key:', apiKey);
  };
  return (
    <Accordion sx={{ my: 3 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1" gutterBottom>
          API Key
        </Typography>
        <TextField
          fullWidth
          label="GROQ API Key"
          variant="outlined"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}