"use client";
import StateCards from "../components/dashboard/StateCards";
import BaseChart from "../components/dashboard/BaseChart";
import TopCategories from "../components/dashboard/TopCategories";

export default function Home() {
  return (
    <div className="grid grid-cols-12 gap-3 p-4">
      {/* State Cards */}
      <div className="col-span-12">
        <StateCards />
      </div>

      {/* Trending Categories Pie Chart */}
      <div className="col-span-12 md:col-span-4">
        <BaseChart
          title="Trending Categories"
          chartType="pie"
          series={[10, 15, 8, 12, 7, 9, 14, 11, 6, 10]}
          categories={[
            "Politics",
            "Technology",
            "Sports",
            "Health",
            "Entertainment",
            "Business",
            "Education",
            "Travel",
            "Science",
            "Lifestyle",
          ]}
          colors={[
            "#F59E0B", // amber
            "#10B981", // green
            "#3B82F6", // blue
            "#EF4444", // red
            "#8B5CF6", // violet
            "#F472B6", // pink
            "#22D3EE", // cyan
            "#A3E635", // lime
            "#FB923C", // orange
            "#6366F1", // indigo
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
              data: [2, 5, 3, 7, 8, 6, 4],
            },
          ]}
          categories={["10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"]}
          color="#3B82F6"
        />
      </div>

      {/* Daily Article Views Line Chart */}
      <div className="col-span-12 md:col-span-6">
        <BaseChart
          title="Daily Article Views"
          chartType="bar"
          series={[
            {
              name: "Views",
              data: [120, 150, 180, 130, 90, 160, 200],
            },
          ]}
          categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          color="#10B981"
        />
      </div>

      {/* Weekly Article Uploads Bar Chart */}
      <div className="col-span-12 rounded-2xl p-6 md:col-span-6 primary">
        <h1 className="text-lg font-semibold mb-4">Top Categories</h1>
        <TopCategories isDashboard/>
      </div>
    </div>
  );
}
