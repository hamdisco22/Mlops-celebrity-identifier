import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography } from '@mui/material';

interface Props {
  onUpload: (file: File) => void;
}

export default function ImageUploader({ onUpload }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      id="upload"
      sx={{
        border: '2px dashed',
        borderColor: 'grey.500',
        p: 4,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drop the image here ...</Typography>
      ) : (
        <>
          <Typography variant="h6">Drag and drop an image here</Typography>
          <Typography>or</Typography>
          <Button variant="contained" component="span">
            Browse Files
          </Button>
        </>
      )}
    </Box>
  );
}