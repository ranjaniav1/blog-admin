"use client";

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

  const isPie = chartType === "pie";
  const safeSeries = series || [];
  const safeCategories = categories || [];

  // ✅ Validate pie chart: series is number[]
  const isValidPie =
    isPie &&
    Array.isArray(safeSeries) &&
    safeSeries.length > 0 &&
    safeSeries.every((v) => typeof v === "number") &&
    safeSeries.some((v) => v > 0); // 🔥 Must have at least one non-zero value

  const isValidSeries =
    !isPie &&
    Array.isArray(safeSeries) &&
    safeSeries.length > 0 &&
    safeSeries.every(
      (s) =>
        typeof s === "object" &&
        s.data &&
        Array.isArray(s.data) &&
        s.data.length > 0 &&
        s.data.some((val) => val > 0) // 🔥 Ensure there's at least one non-zero data point
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
      toolbar: { show: false },
    },
    colors: isSingleColor ? [color] : colors,
    labels: isPie ? safeCategories : undefined,
    xaxis: !isPie ? { categories: safeCategories } : undefined,
    dataLabels: { enabled: false },
    stroke: { curve: chartType === "area" ? "smooth" : "straight" },
    legend: { show: chartType !== "bar" },
  };

  return (
    <div className="primary p-4 my-rounded shadow h-full">
      <h2 className="text-md font-semibold mb-2">{title}</h2>
      <Chart
        options={options}
        series={safeSeries}
        type={chartType}
        height={300}
      />
    </div>
  );
}
