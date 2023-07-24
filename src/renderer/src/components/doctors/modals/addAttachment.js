import React, { memo, useRef } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useClickAway } from 'react-use';

const AddAttachment = ({
  title,
  setTitle,
  file,
  setFile,
  isAttachmentModal,
  setIsAttachmentModal,
}) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    setIsAttachmentModal(false);
  });

  return (
    <>
      <Modal show={isAttachmentModal} size="md">
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>Attachments</Modal.Title>
          </Col>
          <Col md={1} style={{ textAlign: 'end' }}>
            <i
              onClick={() => {
                setIsAttachmentModal(false);
              }}
              className="fa fa-times-circle cursor-pointer"
              aria-hidden="true"
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body className="pb-4" ref={ref}>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title here"
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>File</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="file"
                    accept="image/*,application/pdf"
                    placeholder="Attach file here"
                    defaultValue={''}
                    onChange={(e) => setFile(e.target.files[0])}
                    onClick={(e) => (e.target.value = null)}
                  />
                  {/* <img
                    src={URL.createObjectURL(attachments)}
                    alt="Thumb"
                    height={80}
                    width={280}
                  /> */}
                </Form.Group>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col className="text-center">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsAttachmentModal(false)}
              >
                OK
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default memo(AddAttachment);
