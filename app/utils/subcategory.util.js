import {
    getSubcategories,
    deleteSubcategory,
    addSubcategory,
    editSubcategory,
  } from "../service/subcategory.service";
  
  export async function getNewsSubcategories() {
    try {
      return await getSubcategories();
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      return null;
    }
  }
  
  export async function deleteNewsSubcategory(id) {
    try {
      return await deleteSubcategory(id);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
      return null;
    }
  }
  
  export async function addNewsSubcategory(subcategory) {
    try {
      return await addSubcategory(subcategory);
    } catch (error) {
      console.error("Error adding subcategory:", error);
      return null;
    }
  }
  
  export async function editNewsSubcategory(id, subcategory) {
    try {
      return await editSubcategory(id, subcategory);
    } catch (error) {
      console.error("Error editing subcategory:", error);
      return null;
    }
  }
  