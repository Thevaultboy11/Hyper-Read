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
import { Paper } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

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
  aspectRatio: 1 | 4,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      ticks: {
        display: false
      },
      grid: {
        drawTicks: false
      },
      border: {
        display: false
      }
    }
  },
};

function CurvedLineChart(props:any) {
  return (
    <>
      <Paper className="col-span-12" elevation={3}>
        <div className="row">
          <div className="md:col-span-6 col-span-12 p-5 ml-5">
            <p className="text-xl font-normal">WPM</p>
          </div>
          <div className="col-span-12 p-5">
            <Line
              options={options}
              data={props.data}
            />
          </div>
        </div>
      </Paper>
    </>
  );
}

export default CurvedLineChart;
