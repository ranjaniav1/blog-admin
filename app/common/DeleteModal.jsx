'use client';
import React from 'react';
import Button from '@/app/common/Button';

const DeleteModal = ({ itemName = 'item', onCancel, onDelete }) => {
  return (
    <div>
      <p>
        Are you sure you want to delete <strong>{itemName}</strong>?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 icon-bg"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          type="button"
          className="px-4 py-2 delete"
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
