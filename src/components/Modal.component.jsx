import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';

const Modal = ({ isOpen, hasCloseBtn, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef;

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown}>
      {hasCloseBtn && (
        <button className="modal-close-btn" onClick={handleCloseModal}>
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};

export default Modal;
