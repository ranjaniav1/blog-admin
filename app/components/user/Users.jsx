"use client";

import Table from "@/app/common/Table";
import Modal from "@/app/common/Modal";
import React, { useState } from "react";
import { useAuthHook } from "@/app/hooks/useAuthHook";
import ActionButtons from "@/app/common/ActionButtons";
import EditFormModal from "@/app/common/EditFormModal";
import { userRoleFeild } from "@/app/config/admin.config";
import { useToast } from "@/app/context/ToastContext";
import { format } from "date-fns";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [userId, setUserId] = useState(null);
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const { loading, users, updateUserRole } = useAuthHook(true, currentPage);

  const columns = [
    { label: "Name", accessor: "fullname" },
    {
      label: "Avatar",
      accessor: "avatar_url",
      render: (url) => (
        <img
          src={url}
          alt="Thumbnail"
          className="h-12 w-12 object-cover my-rounded"
        />
      ),
    },
    { label: "Role", accessor: "role", filterable: true },
    { label: "Email", accessor: "email" },
    { label: "Manage Access", accessor: "manage_access" },
    {
      label: "Created At",
      accessor: "created_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
    {
      label: "Updated At",
      accessor: "updated_at",
      render: (val) => {
        const date = new Date(val);
        return isNaN(date) ? "Invalid Date" : format(date, "PPP");
      },
    },
  ];

  const renderActions = (row) => (
    <ActionButtons
      onEdit={(e) => {
        if (row.role !== "user") {
          showToast("error", "You can only update user role.");
          return;
        }
        setUserId(row._id);
        e.stopPropagation();
        setOpen(true);
      }}
    />
  );

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="card my-rounded">
      <Table
        columns={columns}
        data={users?.users || []}
        className="card"
        pagination={{
          totalPages: Number(users.totalPages),
          currentPage: Number(users.page),
          onPageChange: (newPage) => setCurrentPage(newPage),
        }}
        renderActions={renderActions}
        dynamicFields={userRoleFeild}
        showAddButton={false}
      />

      <Modal isOpen={!!open} onClose={() => setOpen(false)}>
        <EditFormModal
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Edit User Role"
          fields={userRoleFeild}
          onSave={(updatedRole) => {
            updateUserRole(userId, updatedRole.role);
            setOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Users;
