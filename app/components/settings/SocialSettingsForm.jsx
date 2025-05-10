"use client";

import { useState } from "react";
import { format } from "date-fns";
import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import EditFormModal from "@/app/common/EditFormModal";
import ActionButtons from "@/app/common/ActionButtons";
import { useSocialSettings } from "@/app/hooks/useSocialSettings"; // Custom hook for social settings
import DeleteModal from "@/app/common/DeleteModal"; // Modal to delete settings
import { socialFields } from "@/app/config/admin.config";

const SocialSettings = ({ bgPrimary = false }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [modalType, setModalType] = useState(""); // "edit" | "delete"
  const [showAddSetting, setShowAddSetting] = useState(false);
  const [newSettingData, setNewSettingData] = useState({}); // State to handle new setting data

  const {
    settings,
    loading,
    createSocialSettings,
    deleteSocialSettings,
    updateSocialSettings,
  } = useSocialSettings();

  const openModal = (setting, type) => {
    setSelectedSetting(setting);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedSetting(null);
    setModalType("");
  };

  const columns = [
    { label: "Platform", accessor: "platform" },
    {
      label: "Image",
      accessor: "img",
      render: (val) => (
        <img src={val} alt="Social Media" className="w-12 h-12 my-rounded" />
      ),
    },
    { label: "Link", accessor: "link" },
    {
      label: "Created At",
      accessor: "created_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
  ];

  const renderActions = (setting) => (
    <ActionButtons
      onEdit={(e) => {
        e.stopPropagation();
        openModal(setting, "edit");
      }}
      onDelete={(e) => {
        e.stopPropagation();
        openModal(setting, "delete");
      }}
    />
  );

  const handleAddSetting = (newSetting) => {
    createSocialSettings(newSetting); // Call the API to create social setting
    setShowAddSetting(false); // Close the modal after saving
    setNewSettingData({}); // Reset new setting data state
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

                                        

  return (
    <div className="p-4">
      <Table
        columns={columns}
        data={settings || []}
        renderActions={renderActions}
        className={"card"}
        pagination={{
          totalPages: 1, // Assuming we don't have pagination here
          currentPage: currentPage,
          onPageChange: (newPage) => setCurrentPage(newPage),
        }}
        addFunction={(newSetting) => createSocialSettings(newSetting)}
        buttonTitle={"Add Social Media"}
        dynamicFields={socialFields}
      />

      {/* -------------------------- add social setting modal -------------------------- */}
      {showAddSetting && (
        <EditFormModal
          isOpen={showAddSetting}
          onClose={() => setShowAddSetting(false)}
          title="Add New Social Setting"
          data={newSettingData} // Pass in the newSettingData to bind form
          onSave={handleAddSetting} // Pass handleAddSetting to save the new setting
        />
      )}

      {/* -------------------- update and delete social setting modal ------------------- */}
      <Modal
        isOpen={!!modalType}
        onClose={closeModal}
        title={
          modalType === "edit" ? "Edit Social Setting" : "Delete Social Setting"
        }
      >
        {modalType === "edit" ? (
          <EditFormModal
            isOpen
            onClose={closeModal}
            title="Edit Social Setting"
            data={selectedSetting}
            onSave={(updatedSetting) => {
              updateSocialSettings(updatedSetting._id, updatedSetting);
              closeModal();
            }}
            fields={socialFields} // Pass in the fields for editing
          />
        ) : (
          <DeleteModal
            itemName={selectedSetting?.link}
            onDelete={() => {
              deleteSocialSettings(selectedSetting?._id);
              closeModal();
            }}
            onCancel={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default SocialSettings;
