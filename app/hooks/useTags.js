// hooks/useTags.js
import { useCallback } from "react";
import { addTag, deleteTag, editTag, getTags } from "../service/tags.service";
import { useGenericCrud } from "./useGenericCrud";


export const useTags = (page = 1) => {
  const fetchFn = useCallback((p) => getTags(p), []);
  const addFn = useCallback((data) => addTag(data), []);
  const updateFn = useCallback((id, data) => editTag(id, data), []);
  const deleteFn = useCallback((id) => deleteTag(id), []);

  return useGenericCrud({
    fetchFn,
    addFn,
    updateFn,
    deleteFn,
    initialPage: page,
    itemName: "Tag",
  });
};