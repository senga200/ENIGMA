
import React from 'react';
import '../styles/Modal.css';

function Modal({ title, message, onClose, onConfirm, confirmText = "OK", cancelText = "Annuler", showCancel = false }) {
  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">{title}</h3>
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          {showCancel && (
            <button className="btn cancel" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button className="btn confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
