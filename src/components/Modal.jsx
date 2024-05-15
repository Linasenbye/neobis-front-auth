import React from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const ModalComponent = ({ open, onClose, children }) => {
  return (
    <Modal open={open} onClose={onClose} >
      {children}
    </Modal>
  )
}

export default ModalComponent