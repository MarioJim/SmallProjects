import React from 'react';
import Modal from 'react-modal';

const OptionModal = ({ selectedOption, handleClearSelectedOption }) => (
  <Modal
    isOpen={ !!selectedOption }
    onRequestClose={ handleClearSelectedOption }
    contentLabel="Selected Option"
    closeTimeoutMS={ 200 }
    className="modal"
  >
    <h3 className="modal__title">Selected Option</h3>
    { selectedOption && <p className="modal__body">{ selectedOption }</p> }
    <button
      type="button"
      onClick={ handleClearSelectedOption }
      className="button"
    >
      Okay
    </button>
  </Modal>
);

Modal.setAppElement('#app');

export default OptionModal;
