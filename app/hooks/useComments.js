"use client";

import { useEffect, useState } from "react";
import { getAllComments, deleteComment } from "../service/comment.service";

export const useComment = () => {
  const [commentsData, setCommentsData] = useState({
    comments: [],
    totalPages: 1,
    currentPage: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);

  const fetchComments = async (page = 1) => {
    setLoading(true);
    try {
      const result = await getAllComments(page);
      if (result?.success && result.data) {
        setCommentsData(result.data); // ✅ keep full data object
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (commentId) => {
    try {
      const result = await deleteComment(commentId);
      if (result?.success && result.data?.commentId) {
        setCommentsData((prev) => ({
          ...prev,
          comments: prev.comments.filter(
            (comment) => comment._id !== result.data.commentId
          ),
          totalCount: prev.totalCount - 1,
        }));
      }
      return result;
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    fetchComments(); // initial fetch
  }, []);

  return {
    loading,
    commentsData,
    removeComment,
    fetchComments,
  };
};
