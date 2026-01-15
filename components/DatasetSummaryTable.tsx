import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

const rows = [
  { feature: 'Total Images', value: 50000 },
  { feature: 'Unique Celebrities', value: 2000 },
  { feature: 'Average Images per Celebrity', value: 25 },
  { feature: 'Image Resolution', value: '256x256' },
];

export default function DatasetSummaryTable() {
  return (
    <TableContainer component={Paper} sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        Dataset Summary
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Metric</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.feature}>
              <TableCell>{row.feature}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}