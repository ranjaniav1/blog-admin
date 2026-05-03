"use client";

import { useDashboard } from "../hooks/useDashboard";
import BaseChart from "../components/dashboard/BaseChart";
import StateCards from "../components/dashboard/StateCards";
// import TopCategories from "../components/dashboard/TopCategories";

export default function Home() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Loading...</p>;
  if (error || !data?.chartData) return <p>Error loading dashboard.</p>;

  const { categoryPie, stackedArticlesByCategory, areaChartData } =
    data.chartData;

  if (!categoryPie || !stackedArticlesByCategory || !areaChartData) {
    return <p>Incomplete chart data.</p>;
  }

  // Validate Category Pie Data
  // Filter out 0 values and their corresponding labels
  const filteredCategoryPie = categoryPie.data
    .map((value, index) => ({ value, label: categoryPie.labels[index] }))
    .filter((item) => item.value > 0);

  const validCategoryData = filteredCategoryPie.map((item) => item.value);
  const validCategoryLabels = filteredCategoryPie.map((item) => item.label);

  // Prepare Stacked Series
  const stackedSeries = Object.entries(stackedArticlesByCategory.series).map(
    ([name, data]) => ({
      name,  // Name will be the category (e.g., Business)
      data: data || []  // Ensure data is an array, even if empty
    })
  );

  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      <div className="col-span-12">
        <StateCards data={data.stats} />
      </div>

      {/* Pie Chart for Categories */}
      <div className="col-span-12 md:col-span-4">
        <BaseChart
          title="Trending Categories"
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

      {/* Area Chart for Articles & Comments over Time */}
      <div className="col-span-12 md:col-span-8">
        <BaseChart
          title="Articles and Comments Over Time"
          chartType="area"
          series={[
            {
              name: "Articles",
              data: areaChartData.map((item) => item.articles),
            },
            {
              name: "Comments",
              data: areaChartData.map((item) => item.comments),
            },
          ]}
          categories={areaChartData.map((item) => item.x)}
          colors={["#3B82F6", "#F87171"]}
        />
      </div>

      {/* Stacked Bar Chart for Articles by Category */}
      <div className="col-span-12 md:col-span-6 mt-4">
        <BaseChart
          title="Articles by Category (Stacked)"
          chartType="bar"
          series={stackedSeries}  
          categories={Object.keys(stackedArticlesByCategory.series)}          // stacked={true}
          colors={["#10B981", "#8B5CF6", "#F59E0B", "#EF4444"]}
          stacked={true}
        />
      </div>

      {/* Top Categories */}
      <div className="col-span-12 my-rounded p-6 md:col-span-6 card mt-4">
        <h1 className="font-semibold mb-2 pl-4 my-font">Top Categories</h1>
        {/* <TopCategories isDashboard /> */}
      </div>
    </div >
  );
}
