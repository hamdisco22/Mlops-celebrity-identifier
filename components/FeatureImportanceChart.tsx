import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const labels = ['Eyes', 'Nose', 'Mouth', 'Hair', 'Jaw'];
const data = {
  labels,
  datasets: [
    {
      label: 'Feature Importance',
      data: [0.3, 0.25, 0.2, 0.15, 0.1],
      backgroundColor: '#3f51b5',
    },
  ],
};

const options = {
  indexAxis: 'y' as const,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export default function FeatureImportanceChart() {
  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
}