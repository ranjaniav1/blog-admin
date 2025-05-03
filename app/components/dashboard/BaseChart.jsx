import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BaseChart({ title, chartType, series, categories, color, colors }) {
  const isSingleColor = !!color;

  const options = {
    chart: {
      type: chartType,
      toolbar: {
        show: false,
      },
    },
    colors: isSingleColor ? [color] : colors,
    xaxis: {
      categories: categories || [],
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: chartType === "area" ? "smooth" : "straight",
    },
    legend: {
      show: chartType !== "bar",
    },
  };

  return (
    <div className="primary p-4 rounded-xl shadow h-full">
      <h2 className="text-md font-semibold mb-2">{title}</h2>
      <Chart
        options={options}
        series={series}
        type={chartType}
        height={300}
      />
    </div>
  );
}
