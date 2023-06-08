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

export const options = {
    responsive: true,
    animation: {
      duration : 250,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1, 2, 3, 4, 5, 6, 7],
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor : 'rgba(75, 192, 192, 1)',
      pointBackgroundColor : 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      pointRadius: 2,
    },
  ],
};

const LineChart = (props) => (<Line options={options} data={{labels:props.labels, datasets:[{label:props.label,data: props.data,borderColor: props.borderColor, pointBorderColor : props.pointBorderColor, pointBackgroundColor: props.pointBackgroundColor, backgroundColor: props.backgroundColor, pointRadius: props.pointRadius}] }} />)
export default LineChart;
