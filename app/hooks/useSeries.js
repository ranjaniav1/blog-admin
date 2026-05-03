import { useCallback } from "react";
import { useGenericCrud } from "./useGenericCrud";
import {
  getSeries,
  addSeries,
  editSeries,
  deleteSeries,
} from "../service/series.service";



export const useSeries = (page = 1) => {
  const fetchFn = useCallback((p) => getSeries(p), []);
  const addFn = useCallback((data) => addSeries(data), []);
  const updateFn = useCallback((id, data) => editSeries(id, data), []);
  const deleteFn = useCallback((id) => deleteSeries(id), []);

  return useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Series",
  });
};