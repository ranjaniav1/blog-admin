"use client";

import { useDashboard } from "../hooks/useDashboard";
import BaseChart from "../components/dashboard/BaseChart";
import StateCards from "../components/dashboard/StateCards";
import TopCategories from "../components/dashboard/TopCategories";

export default function Home() {
  const { data, loading, error } = useDashboard();

  if (loading) return <p>Loading...</p>;
  if (error || !data?.chartData) return <p>Error loading dashboard.</p>;

  const { categoryPie, dailyActiveUsers, peakReadTimeData } = data.chartData;

  if (!categoryPie || !dailyActiveUsers || !peakReadTimeData) {
    return <p>Incomplete chart data.</p>;
  }

  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      <div className="col-span-12">
        <StateCards data={data.stats} />
      </div>

      <div className="col-span-12 md:col-span-4">
        <BaseChart
          title="Trending Categories"
          chartType="pie"
          series={categoryPie.data}
          categories={categoryPie.labels}
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

      <div className="col-span-12 md:col-span-8">
        <BaseChart
          title="Peak Read Time (in mins)"
          chartType="area"
          series={[
            {
              name: "Read Time",
              data: peakReadTimeData.map((item) => item.y),
            },
          ]}
          categories={peakReadTimeData.map((item) => item.x)}
          color="#3B82F6"
        />
      </div>

      <div className="col-span-12 md:col-span-6">
        <BaseChart
          title="Daily Active Users"
          chartType="bar"
          series={[
            {
              name: "Users",
              data: dailyActiveUsers.map((item) => item.users),
            },
          ]}
          categories={dailyActiveUsers.map((item) => item.date)}
          color="#10B981"
        />
      </div>

      <div className="col-span-12 my-rounded p-6 md:col-span-6 primary">
        <h1 className="text-lg font-semibold mb-4">Top Categories</h1>
        <TopCategories isDashboard />
      </div>
    </div>
  );
}
