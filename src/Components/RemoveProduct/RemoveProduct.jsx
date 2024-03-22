import React from "react";
import "./RemoveProduct.css";
import attentionIcon from "../Assets/attention.svg";

const ConfirmationModal = ({ productName, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-modal">
    <img src={attentionIcon} alt="!" />
      <p>Are you sure you want to delete</p>
      <p>{`"${productName}"?`}</p>

      <div className="btn-wrapper">
        <button onClick={onConfirm} className="remove-confirm">
          Yes, I'm sure
        </button>
        <button onClick={onCancel} className="remove-cancel">No, cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
