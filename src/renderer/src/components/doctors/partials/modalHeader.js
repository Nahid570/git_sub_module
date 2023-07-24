import { memo } from 'react';
import { Modal } from 'react-bootstrap';

const ModalHeader = ({ title, action }) => {
  return (
    <Modal.Header className="common-modal-header">
      <Modal.Title>{title}</Modal.Title>
      <i
        onClick={() => action(false)}
        className="fa fa-times-circle cursor-pointer"
        aria-hidden="true"
      ></i>
    </Modal.Header>
  );
};

export default memo(ModalHeader);
