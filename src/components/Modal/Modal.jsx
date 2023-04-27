import React, { useEffect, useState, useCallback } from "react";
import s from "./Modal.module.css";

const Modal = ({ onClose, children }) => {
  const [modalRef, setModalRef] = useState(null);

  const handleOutsideClick = useCallback(
    (event) => {
      if (modalRef && !modalRef.contains(event.target)) {
        onClose();
      }
    },
    [modalRef, onClose]
  );

  useEffect(() => {
    if (modalRef) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalRef, handleOutsideClick]);

  return (
    <div className={s.modalOverlay} onClick={handleOutsideClick}>
      <div className={s.modal} ref={setModalRef}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
