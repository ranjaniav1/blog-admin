"use client";

import React from "react";
import SubCategoryData from "./SubCategoryData";

const SubCategories = ({ bgPrimary = false, showAddButton }) => {
  return <SubCategoryData showAddButton={showAddButton} requiredAllCategory={true} />;
};

export default SubCategories;
