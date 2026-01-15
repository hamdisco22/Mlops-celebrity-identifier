import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5'];
const data = {
  labels,
  datasets: [
    {
      label: 'Training Accuracy',
      data: [0.65, 0.78, 0.85, 0.9, 0.92],
      borderColor: '#3f51b5',
      backgroundColor: 'rgba(63,81,181,0.3)',
    },
    {
      label: 'Validation Accuracy',
      data: [0.6, 0.74, 0.83, 0.88, 0.91],
      borderColor: '#f50057',
      backgroundColor: 'rgba(245,0,87,0.3)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Model Performance Over Epochs',
    },
  },
};

export default function ModelPerformanceChart() {
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <Line data={data} options={options} />
    </div>
  );
}