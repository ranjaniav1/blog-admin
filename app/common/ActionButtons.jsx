'use client';
import React from 'react';
import IconButton from '@/app/common/IconButton';
import { MdOutlineModeEditOutline, MdOutlineDelete } from 'react-icons/md';

const ActionButtons = ({ onEdit, onDelete, tooltip = true }) => {
  return (
    <div className="flex gap-2">
      <IconButton
        Icon={MdOutlineModeEditOutline}
        onClick={onEdit}
        aria_label="Edit"
        variant="primary"
        tooltip={tooltip ? 'Edit' : ''}
        needBg={true}
      />
      <IconButton
        Icon={MdOutlineDelete}
        onClick={onDelete}
        aria_label="Delete"
        variant="danger"
        tooltip={tooltip ? 'Delete' : ''}
        needBg={true}
      />
    </div>
  );
};

export default ActionButtons;
