"use client";

import { useDashboard } from "../hooks/useDashboard";
import BaseChart from "../components/dashboard/BaseChart";
import StateCards from "../components/dashboard/StateCards";

export default function Home() {
  const { data, loading, error } = useDashboard();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Error loading dashboard.</p>;
  }

  const stats = data.stats ?? {};
  const chartData = data.chartData ?? {};

  const categoryPie = chartData.categoryPie ?? {
    labels: [],
    data: [],
  };

  const stackedArticlesByCategory =
    chartData.stackedArticlesByCategory ?? {};

  const areaChartData = chartData.areaChartData ?? [];

  const articlesByStatus = chartData.articlesByStatus ?? {
    published: 0,
    draft: 0,
    pending: 0,
    archived: 0,
    scheduled: 0,
  };

  // ======================================================
  // CATEGORY PIE
  // ======================================================

  const categoryLabels = Array.isArray(categoryPie.labels)
    ? categoryPie.labels
    : [];

  const categoryValues = Array.isArray(categoryPie.data)
    ? categoryPie.data
    : [];

  const filteredCategoryPie = categoryValues
    .map((value, index) => ({
      value: Number(value) || 0,
      label: categoryLabels[index] ?? "Unknown",
    }))
    .filter((item) => item.value > 0);

  const validCategoryData = filteredCategoryPie.map(
    (item) => item.value
  );

  const validCategoryLabels = filteredCategoryPie.map(
    (item) => item.label
  );

  // ======================================================
  // STACKED ARTICLES BY CATEGORY
  // ======================================================

  const months = Object.keys(stackedArticlesByCategory);

  const categories = [
    ...new Set(
      Object.values(stackedArticlesByCategory).flatMap(
        (monthData) =>
          monthData && typeof monthData === "object"
            ? Object.keys(monthData)
            : []
      )
    ),
  ];

  const stackedSeries = categories.map((category) => ({
    name: category,
    data: months.map(
      (month) =>
        Number(
          stackedArticlesByCategory[month]?.[category]
        ) || 0
    ),
  }));

  // ======================================================
  // ARTICLE STATUS
  // ======================================================

  const statusLabels = [
    "Published",
    "Draft",
    "Pending",
    "Archived",
    "Scheduled",
  ];

  const statusData = [
    Number(articlesByStatus.published) || 0,
    Number(articlesByStatus.draft) || 0,
    Number(articlesByStatus.pending) || 0,
    Number(articlesByStatus.archived) || 0,
    Number(articlesByStatus.scheduled) || 0,
  ];

  // ======================================================
  // AREA CHART
  // ======================================================

  const validAreaData = Array.isArray(areaChartData)
    ? areaChartData
    : [];

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="grid grid-cols-12 gap-3 p-4">

      {/* STAT CARDS */}

      <div className="col-span-12">
        <StateCards data={stats} />
      </div>

      {/* CATEGORY PIE */}

      <div className="col-span-12 md:col-span-4">
        <BaseChart
          title="Articles by Category"
          chartType="pie"
          series={validCategoryData}
          categories={validCategoryLabels}
          colors={[
            "#F59E0B",
            "#10B981",
            "#3B82F6",
            "#EF4444",
            "#8B5CF6",
            "#F472B6",
            "#22D3EE",
            "#A3E635",
            "#FB923C",
            "#6366F1",
            "#EAB308",
          ]}
        />
      </div>

      {/* ARTICLES + COMMENTS */}

      <div className="col-span-12 md:col-span-8">
        <BaseChart
          title="Articles and Comments Over Time"
          chartType="area"
          series={[
            {
              name: "Articles",
              data: validAreaData.map(
                (item) => Number(item.articles) || 0
              ),
            },
            {
              name: "Comments",
              data: validAreaData.map(
                (item) => Number(item.comments) || 0
              ),
            },
          ]}
          categories={validAreaData.map(
            (item) => item.x ?? ""
          )}
          colors={[
            "#3B82F6",
            "#F87171",
          ]}
        />
      </div>

     

      {/* ARTICLE STATUS */}

      <div className="col-span-12 md:col-span-4 mt-4">
        <BaseChart
          title="Article Status"
          chartType="pie"
          series={statusData}
          categories={statusLabels}
          colors={[
            "#10B981",
            "#94A3B8",
            "#F59E0B",
            "#EF4444",
            "#3B82F6",
          ]}
        />
      </div>
    </div>
  );
}