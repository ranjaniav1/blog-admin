'use client";'

import { useEffect, useState } from "react";
import { getDashboardData } from "../service/dashboard.service";

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchDashboardData() {
    try {
      const response = await getDashboardData();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error); // Set the error state
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  }

  useEffect(() => {
    console.log("Fetching dashboard data...");
    fetchDashboardData();
  }, []);

  return { data, loading, error };
}
