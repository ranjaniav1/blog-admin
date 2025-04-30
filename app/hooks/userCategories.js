import { useEffect, useState } from "react";
import { getNewsCategories } from "../utils/category.util";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const fetchCategories = async () => {
        try {
        const response = await getNewsCategories();
        if (response) {
            setCategories(response.categories);
        } else {
            setError("Failed to fetch categories");
        }
        } catch (err) {
        setError(err.message || "Something went wrong");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchCategories();
    }, []);
    
    return { categories, loading, error };
}