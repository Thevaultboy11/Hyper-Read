import { Line } from "react-chartjs-2";
import { get_last_months } from "../../lib/date/get_last_six_months";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.color = "#00000";
const line_graph_options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      display: false,
    },

    title: {
      display: true,
    },
  },
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        precision: 0,
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
};

import React from "react";

function CustomLineChart({
  data,
  y_label = get_last_months(new Date(), 1),
}: any): any {
  const graph_data = {
    labels: y_label,
    options: { plugins: { label: { render: "label", fontColor: "#00000" } } },
    datasets: [
      {
        label: "",
        data: data,
        borderColor: "#4592AF", // set the color of the line
        color: "#4592AF",
      },
    ],
  };
  return (
    <div className="h-full">
      <Line
        height="100"
        width="400"
        options={line_graph_options}
        data={graph_data}
      />
    </div>
  );
}

export default CustomLineChart;
