import React, { memo } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from '../partials/modalHeader';
import Editor from '../partials/editor';

const SpecialNoteModal = ({
  specialNote,
  setSpecialNote,
  showSpecialNote,
  setShowSpecialNote,
}) => {
  return (
    <>
      <Modal
        show={showSpecialNote}
        size="lg"
        className="customize-modal-size"
        onClick={(e) => {
          e.stopPropagation();
          setShowSpecialNote(false);
        }}
      >
        <ModalHeader title={'Special Note'} />
        <Modal.Body>
          <Editor data={specialNote} setData={setSpecialNote} height={450} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default memo(SpecialNoteModal);
