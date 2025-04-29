"use client";

import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing React Icons

export default function MostViewedNewsCard({
  imageUrl,
  title,
  description,
  views,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex rounded-xl shadow-md p-4 gap-4 hover:shadow-lg transition">
      <div className="min-w-[100px] h-[80px] relative rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          layout="fill"
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">{views} views</span>

          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              <FaEdit className="text-xl" />
            </button>

            <button
              onClick={onDelete}
              className="p-2 rounded-full bg-red-200 text-red-600 hover:bg-red-300"
            >
              <FaTrashAlt className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
