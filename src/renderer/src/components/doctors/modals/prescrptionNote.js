import { memo, useRef } from 'react';
import { useClickAway } from 'react-use';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const PrescriptionNote = ({ note, setNote, isNoteModal, setIsNoteModal }) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsNoteModal(false);
  });
  return (
    <Modal
      show={isNoteModal}
      size="md"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Modal.Header className="common-modal-header">
        <Col>
          <Modal.Title>Note</Modal.Title>
        </Col>
        <Col md={1} style={{ textAlign: 'end' }}>
          <i
            onClick={() => {
              setIsNoteModal(false);
            }}
            className="fa fa-times-circle cursor-pointer"
            aria-hidden="true"
          ></i>
        </Col>
      </Modal.Header>
      <Modal.Body className="pb-3" ref={ref}>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter note here"
                  defaultValue={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col className="text-center">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsNoteModal(false)}
            >
              Ok
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default memo(PrescriptionNote);
