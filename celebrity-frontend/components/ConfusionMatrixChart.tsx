import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const data = {
  labels: ['Celebrity', 'Non-Celebrity'],
  datasets: [
    {
      label: 'Predicted Celebrity',
      data: [80, 10],
      backgroundColor: '#3f51b5',
    },
    {
      label: 'Predicted Non-Celebrity',
      data: [5, 85],
      backgroundColor: '#f50057',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export default function ConfusionMatrixChart() {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}