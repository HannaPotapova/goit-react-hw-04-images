import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyDowm);
  };

  componentWillUnmount(){
    window.removeEventListener('keydown', this.handleKeyDowm);
  };

  handleKeyDowm = e => {
    if (e.code === 'Escape') {
        this.props.onClose();
      }
  }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <div className={css.Overlay} onClick ={this.handleBackdropClick}>
        <div className={css.Modal}>
          {this.props.children}
        </div>
      </div>, modalRoot
    );
  }
}

export default Modal;
