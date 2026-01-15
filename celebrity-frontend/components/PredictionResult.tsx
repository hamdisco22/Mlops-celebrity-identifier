import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
  result: string;
  image: File | null;
}

export default function PredictionResult({ result, image }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [image]);
  return (
    <Card sx={{ my: 3 }}>
      {previewUrl && (
        <CardMedia
          component="img"
          height="200"
          image={previewUrl}
          alt="Uploaded Image"
        />
      )}
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Prediction Result
        </Typography>
        <Typography variant="body1" component="div">
          {result}
        </Typography>
      </CardContent>
    </Card>
  );
}