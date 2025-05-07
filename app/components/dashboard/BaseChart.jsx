import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BaseChart({
  title,
  chartType,
  series,
  categories,
  color,
  colors,
}) {
  const isSingleColor = !!color;

  // ✅ Validate pie chart: series is number[], labels is string[]
  const isPie = chartType === "pie";
  const isValidPie =
    isPie &&
    Array.isArray(series) &&
    series.length > 0 &&
    series.every((v) => typeof v === "number");

  // ✅ Validate others: series is [{ name, data: [...] }]
  const isValidSeries =
    !isPie &&
    Array.isArray(series) &&
    series.length > 0 &&
    series.every(
      (s) =>
        typeof s === "object" &&
        s.data &&
        Array.isArray(s.data) &&
        s.data.length > 0
    );

  if (!isValidPie && !isValidSeries) {
    return (
      <div className="primary p-4 my-rounded shadow h-full">
        <h2 className="text-md font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-400">No chart data available.</p>
      </div>
    );
  }

  const options = {
    chart: {
      type: chartType,
      toolbar: {
        show: false,
      },
    },
    colors: isSingleColor ? [color] : colors,
    labels: isPie ? categories : undefined,
    xaxis: !isPie ? { categories: categories || [] } : undefined,
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
    <div className="primary p-4 my-rounded shadow h-full">
      <h2 className="text-md font-semibold mb-2">{title}</h2>
      <Chart options={options} series={series} type={chartType} height={300} />
    </div>
  );
}
