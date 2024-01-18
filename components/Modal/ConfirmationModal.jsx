import React from "react";

import Modal from "../../components/Modal/Modal";
const ConfirmationModal = ({ isOpen, onClose, text }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="success-modal-container">
        <div className="modal-text">{text}</div>
        <button className="success-modal-close-button" onClick={onClose}>
          Tamam
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
