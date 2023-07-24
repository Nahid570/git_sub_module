import React, { useState, useEffect } from "react";
import { Row, Col, Button, Table, Modal } from "react-bootstrap";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useDeleteRequest } from "../../hooks/useDeleteRequest";
import { toast } from "react-toastify";
import AssistantFormModal from "../../components/doctors/modals/assistantForm";
import { capitalizeFirstLetter } from "../../utils/helpers";

function AssistantSettings() {
  const [assistants, setAssistants] = useState([]);
  const [isAssistantModal, setIsAssistantModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [singleInnerItem, setSingleInnerItem] = useState(null);

  const handleConfirmModalClose = () => setShowConfirmModal(false);

  const closeAssistantModal = () => {
    setIsAssistantModal(false);
    getAssistantsRefresh();
  };

  const { isLoading: isAssistantsLoading, refetch: getAssistantsRefresh } =
    useGetRequest(
      "getAssistants",
      `assistants`,
      (data) => {
        setAssistants(data);
      },
      (e) => {
        console.log(e);
      }
    );

  useEffect(() => {
    getAssistantsRefresh();
  }, []);

  const handleDeleteClick = (innerObj) => {
    setSingleInnerItem(innerObj);
    setShowConfirmModal(true);
  };

  const { isLoading: isAssistantDeleteLoading, mutate: deleteAssistant } =
    useDeleteRequest(
      `assistants/${singleInnerItem?.id}`,
      (data) => {
        setAssistants(
          assistants.filter((item) => item.id !== singleInnerItem.id)
        );
        setShowConfirmModal(false);
        toast.success("Deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      (e) => {
        toast.error(e.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    );

  return (
    <div fluid>
      <Row>
        <Col md={12} fluid>
          <div className="col-xl-12 col-lg-12">
            <div className="mb-4">
              <div className="card-body" style={{ minHeight: "75vh" }}>
                <Row className="pb-2">
                  <Col>
                    <h4 className="font-weight-bold text-primary ml-3">
                      Assistant List
                    </h4>
                  </Col>
                  <Col>
                    <Button
                      variant="default"
                      className="btn-success float-right"
                      onClick={() => setIsAssistantModal(true)}
                    >
                      <i className="fa fa-plus-circle"> </i> New Assistant
                    </Button>
                  </Col>
                </Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>Name</th>
                      <th style={{ width: "15%" }}>Phone Number</th>
                      <th style={{ width: "15%" }}>Email</th>
                      <th style={{ width: "20%" }}>Gender</th>
                      <th style={{ width: "20%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assistants.length > 0 &&
                      assistants?.map((item) => (
                        <tr key={item.id}>
                          <td>{item.name || ""}</td>
                          <td>{item.phoneNumber}</td>
                          <td>{item?.email}</td>
                          <td>{capitalizeFirstLetter(item?.gender)}</td>
                          <td>
                            <>
                              {/* <i
                                style={{ cursor: "pointer" }}
                                className="far fa-edit"
                              ></i> */}
                              <i
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                }}
                                className="far fa-trash-alt"
                                onClick={() => handleDeleteClick(item)}
                              ></i>
                            </>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <AssistantFormModal
        isAssistantModal={isAssistantModal}
        closeAssistantModal={closeAssistantModal}
      />

      {/* <Modal size="lg" show={showEditModal} onHide={handlePresetModalClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title>{getModalTitle()} Edit</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: "end" }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handlePresetModalClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="mobile-number">Name</label>
            <input
              className="form-control"
              type="text"
              defaultValue={singleInnerItem ? singleInnerItem.name : ""}
              onChange={(e) =>
                handleChangeInnerItem(
                  singleInnerItem.id,
                  "name",
                  e.target.value
                )
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile-number">Priority</label>
            <input
              className="form-control"
              type="text"
              defaultValue={singleInnerItem ? singleInnerItem.priority : ""}
              onChange={(e) =>
                handleChangeInnerItem(
                  singleInnerItem.id,
                  "priority",
                  e.target.value
                )
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePresetModalClose}>
            Cancel
          </Button>{" "}
          <Button variant="primary" onClick={updatePresetItem}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Modal size="lg" show={showConfirmModal} onHide={handleConfirmModalClose}>
        <Modal.Header className="common-modal-header">
          <Col>
            <Modal.Title> Delete</Modal.Title>
          </Col>
          <Col md={4}></Col>
          <Col md={1} style={{ textAlign: "end" }}>
            <i
              className="fa fa-times cursor-pointer"
              aria-hidden="true"
              onClick={handleConfirmModalClose}
            ></i>
          </Col>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleConfirmModalClose}>
            Cancel
          </Button>{" "}
          <Button variant="primary" onClick={deleteAssistant}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssistantSettings;
