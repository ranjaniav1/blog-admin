"use client";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const BaseChart = ({
  title,
  chartType = "line",
  series = [],
  categories = [],
  colors = [],
  stacked = false,
}) => {
  const safeCategories = Array.isArray(categories)
    ? categories
    : [];

  const safeSeries = Array.isArray(series)
    ? series
    : [];

  const isPie = chartType === "pie";
  const isArea = chartType === "area";
  const isBar = chartType === "bar";

  // ApexCharts expects pie series to be numbers
  // and other charts to use [{ name, data }]
  const normalizedSeries = isPie
    ? safeSeries.map((value) => Number(value) || 0)
    : safeSeries.map((item) => ({
        name: item?.name ?? "",
        data: Array.isArray(item?.data)
          ? item.data.map((value) => Number(value) || 0)
          : [],
      }));

  const options = {
    chart: {
      type: isArea
        ? "area"
        : isBar
        ? "bar"
        : isPie
        ? "pie"
        : "line",
      toolbar: {
        show: false,
      },
      stacked,
    },

    // IMPORTANT:
    // ApexCharts needs labels for pie charts.
    labels: isPie ? safeCategories : undefined,

    xaxis: {
      categories: isPie ? [] : safeCategories,
    },

    colors,

    legend: {
      show: true,
      position: "bottom",
    },

    dataLabels: {
      enabled: isPie,
    },

    stroke: {
      curve: isArea ? "smooth" : "straight",
      width: isPie ? 0 : 2,
    },

    fill: {
      type: isArea ? "gradient" : "solid",
      opacity: isArea ? 0.35 : 1,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },

      pie: {
        expandOnClick: true,
      },
    },

    tooltip: {
      shared: !isPie,
      intersect: false,
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Don't render a chart until the data has valid structure
  if (isPie && safeCategories.length !== normalizedSeries.length) {
    return (
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          No chart data available.
        </p>
      </div>
    );
  }

  if (!isPie && normalizedSeries.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          {title}
        </h3>
        <p className="text-sm text-gray-500">
          No chart data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">
        {title}
      </h3>

      <Chart
        options={options}
        series={normalizedSeries}
        type={
          isArea
            ? "area"
            : isBar
            ? "bar"
            : isPie
            ? "pie"
            : "line"
        }
        height={350}
      />
    </div>
  );
};

export default BaseChart;