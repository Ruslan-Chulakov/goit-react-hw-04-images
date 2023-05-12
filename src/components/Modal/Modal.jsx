import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {

  useEffect(() => {
    window.addEventListener('keydown', handleCloseModal);
    return () => window.removeEventListener('keydown', handleCloseModal);
  });
  
  const handleCloseModal = evt => {
    if (evt.code === 'Escape' || evt.currentTarget === evt.target) {
      onClose();
    }
  };
  
  return createPortal(
    <div className={css.Overlay} onClick={handleCloseModal}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
