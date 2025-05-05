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
          variant="outline"
          type="button"
          bgColorRequired
          onClick={onCancel}
          className="px-4 py-2 icon-bg my-rounded"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          variant="danger"
          type="button"
          bgColorRequired
          className="px-4 py-2 my-rounded"
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteModal;
