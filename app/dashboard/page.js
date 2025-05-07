"use client";

import { useDashboard } from "../hooks/useDashboard";
import BaseChart from "../components/dashboard/BaseChart";
import StateCards from "../components/dashboard/StateCards";
import TopCategories from "../components/dashboard/TopCategories";

export default function Home() {
  const { data, loading, error } = useDashboard();
  loading && <p>Loading...</p>;

  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      {/* State Cards */}
      <div className="col-span-12">
        <StateCards data={data?.stats} />
      </div>

      {/* Trending Categories Pie Chart */}
      <div className="col-span-12 md:col-span-4">
        <BaseChart
          title="Trending Categories"
          chartType="pie"
          series={data?.chartData?.categoryPie?.data || []}
          categories={data?.chartData?.categoryPie?.labels || []}
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

      {/* Peak Read Time Area Chart */}
      <div className="col-span-12 md:col-span-8">
        <BaseChart
          title="Peak Read Time (in mins)"
          chartType="area"
          series={[
            {
              name: "Read Time",
              data:
                data?.chartData?.peakReadTimeData?.map((item) => item.y) || [],
            },
          ]}
          categories={
            data?.chartData?.peakReadTimeData?.map((item) => item.x) || []
          }
          color="#3B82F6"
        />
      </div>

      {/* Daily Article Views Line Chart */}
      <div className="col-span-12 md:col-span-6">
        <BaseChart
          title="Daily Active Users"
          chartType="bar"
          series={
            data?.chartData?.dailyActiveUsers
              ? [
                  {
                    name: "Users",
                    data: data?.chartData?.dailyActiveUsers?.map(
                      (item) => item.users
                    ),
                  },
                ]
              : []
          }
          categories={
            data?.chartData?.dailyActiveUsers
              ? data.chartData.dailyActiveUsers.map((item) => item.date)
              : []
          }
          color="#10B981"
        />
      </div>

      {/* Weekly Article Uploads Bar Chart */}
      <div className="col-span-12 my-rounded p-6 md:col-span-6 primary">
        <h1 className="text-lg font-semibold mb-4">Top Categories</h1>
        <TopCategories isDashboard />
      </div>
    </div>
  );
}
