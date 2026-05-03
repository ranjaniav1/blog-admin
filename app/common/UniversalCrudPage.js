"use client";
import { format } from "date-fns";
import Table from "./Table";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import ActionButtons from "./ActionButtons";
import React, { useState, useEffect } from "react";
import { SimpleForm } from "./EditFormModal";
import { getCategories } from "../service/category.service";
import { getSeries } from "../service/series.service";

const UniversalCrudPage = ({
  title,
  columns,
  fields,
  useCrudHook,
  linkUrl,
  showUpdatedAt = false,
  bgPrimary = false,
  isDashboard = false,
  additionalColumns = [],
  customRenderActions,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dynamicOptions, setDynamicOptions] = useState({});

  const {
    data,
    loading,
    currentPage,
    setCurrentPage,
    addItem,
    updateItem,
    deleteItem,
  } = useCrudHook(1);

  // Fetch dynamic options for select fields
  useEffect(() => {
    const fetchDynamicOptions = async () => {
      const options = {};
      
      // Check each field to see if it needs dynamic options
      for (const field of fields) {
        // For category_id field (used in subcategories and articles)
        if (field.name === "category_id") {
          try {
            const response = await getCategories(1);
            const categories = response?.data?.categories || [];
            options.category_id = categories.map(c => ({
              value: c._id,
              label: c.name
            }));
          } catch (error) {
            console.error("Error fetching categories:", error);
            options.category_id = [];
          }
        }
        
        // For seriesId field (used in lessons)
        if (field.name === "seriesId") {
          try {
            const response = await getSeries(1);
            const seriesList = response?.data?.series || [];
            options.seriesId = seriesList.map(s => ({
              value: s._id,
              label: s.name
            }));
          } catch (error) {
            console.error("Error fetching series:", error);
            options.seriesId = [];
          }
        }
      }
      
      setDynamicOptions(options);
    };
    
    fetchDynamicOptions();
  }, [fields]);

  const openModal = (type, item = null) => {
    setSelectedItem(item);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalType("");
  };

  const handleAdd = async (newItem) => {
    setIsSubmitting(true);
    try {
      await addItem(newItem);
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (updatedItem) => {
    setIsSubmitting(true);
    try {
      await updateItem(selectedItem._id, updatedItem);
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await deleteItem(selectedItem._id);
      closeModal();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultRenderActions = (item) => (
    <ActionButtons
      onEdit={() => openModal("edit", item)}
      onDelete={() => openModal("delete", item)}
    />
  );

  const allColumns = [...columns, ...additionalColumns];

  if (showUpdatedAt && !allColumns.find((c) => c.accessor === "updated_at")) {
    allColumns.push({
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    });
  }

  const items = data?.items || data?.categories || data?.series || data?.tags || data?.users || data?.lessons || [];

  // Enhance fields with dynamic options
  const enhancedFields = fields.map(field => {
    if (dynamicOptions[field.name]) {
      return { ...field, options: dynamicOptions[field.name] };
    }
    return field;
  });

  if (loading && !items.length) {
    return <div className="text-center py-10">Loading {title}s...</div>;
  }

  return (
    <>
      <Table
        columns={allColumns}
        linkUrl={linkUrl}
        data={isDashboard ? items.slice(0, 3) : items}
        renderActions={customRenderActions || defaultRenderActions}
        className={bgPrimary ? "card" : ""}
        pagination={
          data?.totalPages > 1
            ? {
                totalPages: Number(data.totalPages),
                currentPage: Number(currentPage),
                onPageChange: setCurrentPage,
              }
            : undefined
        }
        addFunction={() => openModal("add")}
        buttonTitle={`Add ${title}`}
      />

      <Modal
        isOpen={modalType === "add" || modalType === "edit"}
        onClose={closeModal}
        title={modalType === "add" ? `Add ${title}` : `Edit ${title}`}
      >
        <SimpleForm
          fields={enhancedFields}
          data={modalType === "edit" ? selectedItem || {} : {}}
          onClose={closeModal}
          onSubmit={modalType === "add" ? handleAdd : handleEdit}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <Modal
        isOpen={modalType === "delete"}
        onClose={closeModal}
        title={`Delete ${title}`}
      >
        <DeleteModal
          itemName={selectedItem?.name || selectedItem?.title}
          onDelete={handleDelete}
          onCancel={closeModal}
        />
      </Modal>
    </>
  );
};

export default UniversalCrudPage;