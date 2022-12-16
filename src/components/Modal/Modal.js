import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({onClose, children}) {
  useEffect(() => {
    const handleKeyDowm = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    }
  
    window.addEventListener('keydown', handleKeyDowm);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDowm);
    }
  }, [onClose]);
  

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }
  
    return createPortal(
      <div className={css.Overlay} onClick ={handleBackdropClick}>
        <div className={css.Modal}>
          {children}
        </div>
      </div>, modalRoot
    );
}

export default Modal;
