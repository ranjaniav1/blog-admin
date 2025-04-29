import React from "react";
import MostViewedNewsCard from "@/app/common/MostViewedNewsCard";

const newsData = {
  imageUrl: "https://placehold.co/200x200",
  title: "Top Trending News Title",
  description:
    "This is a brief description of the trending news article, it will be truncated if too long.",
  views: 1200,
  onEdit: () => console.log("Edit clicked"),
  onDelete: () => console.log("Delete clicked"),
};

const MostViewdNews = () => {
  return (
    <div className="space-y-4 border rounded-lg">
      <MostViewedNewsCard {...newsData} />
      {/* You can add more news cards here */}
    </div>
  );
};

export default MostViewdNews;
