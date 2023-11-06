import React from "react";
import "./deleteIcon.styles.css";

const DeleteIcon = ({ assetId, onDelete }) => (
  <button
    className="asset-delete-icon"
    onClick={(e) => {
      e.stopPropagation();
      onDelete(assetId);
    }}
  >
    &times;
  </button>
);

export default DeleteIcon;
