"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const BaseChart = ({
  title = "Chart Title",
  chartType = "bar",
  series = [],
  categories = [],
  color,
  height = 350,
}) => {
  const isPieChart = chartType === "pie";

  const options = {
    chart: {
      type: chartType,
      height,
      toolbar: { show: false },
    },
    labels: isPieChart ? categories : undefined,
    xaxis: !isPieChart
      ? {
          categories,
          title: { text: "Day" },
        }
      : undefined,
    yaxis: !isPieChart
      ? {
          title: { text: "Count" },
        }
      : undefined,
    colors: isPieChart
      ? color // use multi-colors array
      : typeof color === "string"
      ? [color] // wrap string in array
      : "#3B82F6", // fallback to first or default
    dataLabels: {
      enabled: false, // disable labels for pie chart
    },
    tooltip: {
      y: {
        formatter: (val) => (isPieChart ? `${val}` : val) || "",
      },
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="card mx-2 p-6 rounded-2xl h-full">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <Chart
        options={options}
        series={series}
        type={chartType}
        height={height}
      />
    </div>
  );
};

export default BaseChart;
