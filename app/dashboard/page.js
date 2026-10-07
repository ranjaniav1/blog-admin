"use client";

import { useDashboard } from "../hooks/useDashboard";
import BaseChart from "../components/dashboard/BaseChart";
import StateCards from "../components/dashboard/StateCards";

export default function Home() {
  const { data, loading, error } = useDashboard();

  // ======================================================
  // LOADING / ERROR
  // ======================================================

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data?.chartData) {
    return <p>Error loading dashboard.</p>;
  }

  const {
    categoryPie,
    stackedArticlesByCategory,
    areaChartData,
    articlesByStatus,
  } = data.chartData;

  if (
    !categoryPie ||
    !stackedArticlesByCategory ||
    !areaChartData ||
    !articlesByStatus
  ) {
    return <p>Incomplete dashboard data.</p>;
  }

  // ======================================================
  // CATEGORY PIE CHART
  // ======================================================

  const filteredCategoryPie = categoryPie.data
    .map((value, index) => ({
      value,
      label: categoryPie.labels[index],
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

  const months = Object.keys(
    stackedArticlesByCategory
  );

  // Get every category appearing in the data
  const categories = [
    ...new Set(
      Object.values(stackedArticlesByCategory).flatMap(
        (monthData) => Object.keys(monthData)
      )
    ),
  ];

  // Convert:
  //
  // {
  //   "2026-09": {
  //     JavaScript: 5,
  //     React: 3
  //   },
  //   "2026-10": {
  //     JavaScript: 4,
  //     React: 6
  //   }
  // }
  //
  // into ApexCharts series

  const stackedSeries = categories.map((category) => ({
    name: category,

    data: months.map(
      (month) =>
        stackedArticlesByCategory[month]?.[
          category
        ] || 0
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
    articlesByStatus.published || 0,
    articlesByStatus.draft || 0,
    articlesByStatus.pending || 0,
    articlesByStatus.archived || 0,
    articlesByStatus.scheduled || 0,
  ];

  // ======================================================
  // RENDER
  // ======================================================

  return (
    <div className="grid grid-cols-12 gap-3 p-4">

      {/* ==================================================
          STAT CARDS
      ================================================== */}

      <div className="col-span-12">
        <StateCards data={data.stats} />
      </div>


      {/* ==================================================
          CATEGORY PIE
      ================================================== */}

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


      {/* ==================================================
          ARTICLES + COMMENTS
      ================================================== */}

      <div className="col-span-12 md:col-span-8">
        <BaseChart
          title="Articles and Comments Over Time"
          chartType="area"
          series={[
            {
              name: "Articles",
              data: areaChartData.map(
                (item) => item.articles
              ),
            },
            {
              name: "Comments",
              data: areaChartData.map(
                (item) => item.comments
              ),
            },
          ]}
          categories={areaChartData.map(
            (item) => item.x
          )}
          colors={[
            "#3B82F6",
            "#F87171",
          ]}
        />
      </div>


      {/* ==================================================
          ARTICLES BY CATEGORY
      ================================================== */}

      <div className="col-span-12 md:col-span-8 mt-4">
        <BaseChart
          title="Articles by Category"
          chartType="bar"
          series={stackedSeries}
          categories={months}
          colors={[
            "#10B981",
            "#8B5CF6",
            "#F59E0B",
            "#EF4444",
            "#3B82F6",
            "#F472B6",
          ]}
          stacked={true}
        />
      </div>


      {/* ==================================================
          ARTICLE STATUS
      ================================================== */}

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