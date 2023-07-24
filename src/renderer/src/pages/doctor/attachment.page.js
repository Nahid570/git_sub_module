import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/doctors/partials/Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import LoadingButton from './../../components/forms/LoadingButton';
import { usePostRequest } from '../../hooks/usePostRequest';
import { useGetRequest } from '../../hooks/useGetRequest';
import AttachmentView from '../../components/doctors/attachmentView';
import { useDeleteRequest } from '../../hooks/useDeleteRequest';

function Attachment({}) {
  const [showAddAttachmentModal, setShowAddAttachmentModal] = useState(false);
  const [showViewAttachmentModal, setShowViewAttachmentModal] = useState(false);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [attachmentId, setAttachmentId] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const formData = new FormData();
  const { state } = useLocation();
  const { patientId, prescriptionId } = state;

  const {
    isLoading: isAttachmentsLoading,
    refetch: getAttachments,
  } = useGetRequest(
    'getAllAttachment',
    'attachments?prescriptionId=' + prescriptionId,
    (data) => {
      console.log(data);
      setAttachments(data);
    },
    (error) => {
      console.log(error, 'error');
    },
  );

  const { isLoading: isSaveLoading, mutate: submitAttachment } = usePostRequest(
    'attachments',
    formData,
    (data) => {
      setShowAddAttachmentModal(false);
      getAttachments();
      toast.success('Successfully created', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    (e) => {
      toast.error('Something went wrong', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    { 'content-type': 'multipart/form-data' },
  );

  const handleSubmit = () => {
    if (true) {
      formData.append('name', title);
      formData.append('patientId', patientId);
      formData.append('prescriptionId', prescriptionId);
      formData.append('file', file);
      submitAttachment();
    } else {
      if (!patientId) {
        toast.error('Patient is not selected', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (!file) {
        toast.error('File is not attached', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const {
    isLoading: isPresetDeleteLoading,
    mutate: deleteAttachment,
  } = useDeleteRequest(
    `attachments/${attachmentId}`,
    (data) => {
      const newAttachments = attachments.filter(
        (item) => item.id !== attachmentId,
      );
      setAttachments([...newAttachments]);
      setShowConfirmModal(false);
    },
    (e) => {
      console.log(e);
    },
  );

  const handleDelete = (attachmentId) => {
    setAttachmentId(attachmentId);
    setShowConfirmModal(true);
  };

  const handleAttachmentView = (attachmentObj) => {
    setSelectedAttachment(attachmentObj);
    setShowViewAttachmentModal(true);
  };

  useEffect(() => {
    getAttachments();
  }, []);

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Attachments
                </h6>
              </div>
              <div
                className="card-body"
                style={{ minHeight: '90vh', margin: 'auto', paddingTop: '10%' }}
              >
                <div className="row attachmentContainer">
                  {attachments.map((item) => (
                    <div className="attachmentItemContainer" key={item.id}>
                      <i
                        className={`far fa-file-${
                          item?.fileType === '.pdf' ? 'pdf' : 'image'
                        } fa-5x`}
                      ></i>
                      <p className="title" title={item?.name}>
                        {item?.name?.length > 40
                          ? item.name.substring(0, 40) + '...'
                          : item.name}
                      </p>
                      <div className="row justify-content-around">
                        <i
                          className="fa fa-eye cursor-pointer"
                          onClick={() => handleAttachmentView(item)}
                        ></i>
                        <i
                          className="fa fa-times-circle cursor-pointer"
                          onClick={() => handleDelete(item.id)}
                        ></i>
                      </div>
                    </div>
                  ))}

                  <div
                    className="attachmentItemContainer allCenter cursor-pointer"
                    onClick={() => setShowAddAttachmentModal(true)}
                  >
                    <p style={{ fontSize: 'xxx-large' }}>+</p>
                  </div>

                  <Modal show={showAddAttachmentModal} size="lg">
                    <Modal.Header className="common-modal-header">
                      <Col>
                        <Modal.Title>Add Attachment</Modal.Title>
                      </Col>
                      <Col md={1} style={{ textAlign: 'end' }}>
                        <i
                          onClick={() => {
                            setShowAddAttachmentModal(false);
                          }}
                          className="fa fa-times cursor-pointer"
                          aria-hidden="true"
                        ></i>
                      </Col>
                    </Modal.Header>
                    <Modal.Body className="pb-4">
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
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Form.Group className="mb-3" controlId="name">
                              <Form.Label>File</Form.Label>
                              <input
                                className="form-control"
                                type="file"
                                accept="image/*,application/pdf"
                                placeholder="Attach file here"
                                defaultValue={''}
                                onChange={(e) => setFile(e.target.files[0])}
                                onClick={(e) => (e.target.value = null)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Form>
                      <Row>
                        <Col className="text-center">
                          <Button
                            variant="secondary"
                            size="md"
                            className="mr-2"
                            onClick={() => setShowAddAttachmentModal(false)}
                          >
                            Cancel
                          </Button>
                          {/* <Button
                            variant="primary"
                            size="md"
                            onClick={handleSubmit}
                          >
                            Submit
                          </Button> */}
                          {isSaveLoading ? (
                            <LoadingButton />
                          ) : (
                            <Button
                              variant="primary"
                              size="md"
                              onClick={handleSubmit}
                            >
                              Save
                            </Button>
                          )}
                        </Col>
                      </Row>
                    </Modal.Body>
                  </Modal>

                  <Modal show={showViewAttachmentModal} size="xl">
                    <Modal.Header className="common-modal-header">
                      <Col>
                        <Modal.Title>Attachment View</Modal.Title>
                      </Col>
                      <Col md={1} style={{ textAlign: 'end' }}>
                        <i
                          onClick={() => {
                            setShowViewAttachmentModal(false);
                          }}
                          className="fa fa-times cursor-pointer"
                          aria-hidden="true"
                        ></i>
                      </Col>
                    </Modal.Header>
                    <Modal.Body className="pb-4">
                      <AttachmentView attachment={selectedAttachment} />
                    </Modal.Body>
                  </Modal>

                  {/* delete confirmation modal */}
                  <Modal
                    size="lg"
                    show={showConfirmModal}
                    // onHide={handleConfirmModalClose}
                  >
                    <Modal.Header className="common-modal-header">
                      <Col>
                        <Modal.Title>Attachment Delete</Modal.Title>
                      </Col>
                      <Col md={4}></Col>
                      <Col md={1} style={{ textAlign: 'end' }}>
                        <i
                          className="fa fa-times cursor-pointer"
                          aria-hidden="true"
                          onClick={() => setShowConfirmModal(false)}
                        ></i>
                      </Col>
                    </Modal.Header>
                    <Modal.Body>Are you sure to delete?</Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={() => setShowConfirmModal(false)}
                      >
                        Cancel
                      </Button>{' '}
                      <Button variant="primary" onClick={deleteAttachment}>
                        Yes
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attachment;
