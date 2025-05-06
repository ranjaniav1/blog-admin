"use client";

import { useEffect, useState } from "react";
import { getAllComments, deleteComment } from "../service/comment.service";
import { useToast } from "../context/ToastContext";

export const useComment = () => {
  const [commentsData, setCommentsData] = useState({
    comments: [],
    totalPages: 1,
    currentPage: 1,
    totalCount: 0,
  });
  const [loading, setLoading] = useState(false);
  const { showToast, dismissToast } = useToast();

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
    const toastId = showToast("loading", "Deleting comment...");
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
      showToast("success", result.message || "Comment deleted successfully");
      return result;
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      dismissToast(toastId);
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
